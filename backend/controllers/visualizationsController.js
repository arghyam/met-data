import db from "../db/config.js";
import { getCache, setCache } from "../utils/redis.js";

const toSnakeCase = (str) => {
  return str
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("_");
};

const Plot = async (req, res) => {
  const state = req.query.state;
  const district = req.query.district;
  const parameter = toSnakeCase(req.query.parameter);
  const start = parseInt(req.query.startingYear, 10);
  const end = parseInt(req.query.endingYear, 10);
  const cacheKey = `plotdata:${parameter}`;

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

    const filteredData = plotdata
      .filter(
        (item) =>
          item.state === state &&
          item.district === district &&
          item.year >= start &&
          item.year <= end
      )
      .map((item) => {
        const monthlyValues = Object.values(item.values);
        const mean =
          monthlyValues.reduce((sum, value) => sum + value, 0) /
          monthlyValues.length;
        return {
          year: item.year,
          value: mean,
        };
      });

    res.json(filteredData);
  } catch (err) {
    console.error("Error:", err);
    res.json({ error: "An error occurred" });
  }
};

export default { Plot };
