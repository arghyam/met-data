import db from "../db/config.js";

const Mean = (req, res) => {

  const toSnakeCase = (str) => {
    return str
      .split(' ')
      .map(word => word.toLowerCase())
      .join('_');
  };


  const state = req.query.state;
  const district = req.query.district;
  const parameter = toSnakeCase(req.query.parameter);
  const start = req.query.startingYear;
  const end = req.query.endingYear;
  const info = toSnakeCase(req.query.infoType);

  console.log(state, district, parameter, start, end, info);

  let sql = "";
  let values = [state, district, start, end];

  if (info === "annual_mean") {
    sql = `
            SELECT state, district, year, 
            (january + february + march + april + may + june + july + august + september + october + november + december) / 12 AS ${"Annual_Mean"}
            FROM public.${parameter}
            WHERE state = $1 AND district = $2 AND year >= $3 AND year <= $4
            ORDER BY year;
        `;
  } else if (info === "monthly_mean") {
    sql = `
            SELECT state, district,
            AVG(january) AS Avg_January,
            AVG(february) AS Avg_February,
            AVG(march) AS Avg_March,
            AVG(april) AS Avg_April,
            AVG(may) AS Avg_May,
            AVG(june) AS Avg_June,
            AVG(july) AS Avg_July,
            AVG(august) AS Avg_August,
            AVG(september) AS Avg_September,
            AVG(october) AS Avg_October,
            AVG(november) AS Avg_November,
            AVG(december) AS Avg_December
            FROM public.${parameter}
            WHERE state = $1 AND district = $2 AND year >= $3 AND year <= $4
            GROUP BY state, district
            ORDER BY state, district;
        `;
  } else if (info === "annual_total") {
    sql = `
            SELECT state, district, year, 
            (january + february + march + april + may + june + july + august + september + october + november + december) AS ${"Annual_Total"}
            FROM public.${parameter}
            WHERE state = $1 AND district = $2 AND year >= $3 AND year <= $4
            ORDER BY year;
        `;
  } else {
    return res.json({ error: "Invalid infoType" });
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ error: err.message });
    }
    const data = result.rows;
    return res.json({ data });
  });
};

export default { Mean };
