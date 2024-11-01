import db from "../db/config.js";
import { getCache, setCache } from "../utils/redis.js";
import { calculateMeans, toSnakeCase } from "../utils/calculations.js";

const Mean = async (req, res) => {
  const state = req.query.state;
  const district = req.query.district;
  let parameter = toSnakeCase(req.query.parameter);
  const start = parseInt(req.query.startingYear, 10);
  const end = parseInt(req.query.endingYear, 10);
  const info = toSnakeCase(req.query.infoType);
  const cacheKey = `${parameter}`;
  if (parameter === "reference_crop_evapotranspiration") {
    parameter = "reference_crop_evapotranspirati";
  }
  console.log(state, district, parameter, start, end, info);

  try {
    let plotdata = await getCache(req.redisClient, cacheKey);

    if (!plotdata) {
      const sql = `
        SELECT year, state, district, january, february, march, april, may, june, july, august, september, october, november, december
        FROM public.${parameter}
        ORDER BY year;
      `;

      const result = await new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });

      plotdata = result.rows.map((row) => ({
        year: row.year,
        state: row.state,
        district: row.district,
        values: {
          january: row.january,
          february: row.february,
          march: row.march,
          april: row.april,
          may: row.may,
          june: row.june,
          july: row.july,
          august: row.august,
          september: row.september,
          october: row.october,
          november: row.november,
          december: row.december,
        },
      }));

      await setCache(req.redisClient, cacheKey, plotdata);
    }

    // console.log("Plotdata fetched:", plotdata);

    const data = calculateMeans(plotdata, state, district, start, end, info);
    // console.log("Calculated data:", data);
    return res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    return res.json({ error: err.message });
  }
};

export default { Mean };
