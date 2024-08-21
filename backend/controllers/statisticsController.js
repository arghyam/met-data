import db from '../db/config.js';

const Mean = (req, res) => {
    const state = req.query.state;
    const district = req.query.district;
    const parameter = req.query.parameter;
    const start = req.query.startingYear;
    const end = req.query.endingYear;
    const info = req.query.infoType;
    
    console.log(state, district, parameter, start, end, info);

    let sql = '';
    let values = [state, district, start, end];

    if (info === 'Annual_Mean') {
        sql = `
            SELECT state, district, year, 
            (january + february + march + april + may + june + july + august + september + october + november + december) / 12 AS annual_mean
            FROM public.${parameter}
            WHERE state = $1 AND district = $2 AND year >= $3 AND year <= $4
            ORDER BY year;
        `;
    } 
    else if (info === 'Monthly_Mean') {
        sql = `
            SELECT state, district,
            AVG(january) AS avg_january,
            AVG(february) AS avg_february,
            AVG(march) AS avg_march,
            AVG(april) AS avg_april,
            AVG(may) AS avg_may,
            AVG(june) AS avg_june,
            AVG(july) AS avg_july,
            AVG(august) AS avg_august,
            AVG(september) AS avg_september,
            AVG(october) AS avg_october,
            AVG(november) AS avg_november,
            AVG(december) AS avg_december
            FROM public.${parameter}
            WHERE state = $1 AND district = $2 AND year >= $3 AND year <= $4
            GROUP BY state, district
            ORDER BY state, district;
        `;
    } 
    else if (info === 'Annual_Total') {
        sql = `
            SELECT state, district, year, 
            (january + february + march + april + may + june + july + august + september + october + november + december) AS annual_total
            FROM public.${parameter}
            WHERE state = $1 AND district = $2 AND year >= $3 AND year <= $4
            ORDER BY year;
        `;
    } 
    else {
        return res.json({ error: 'Invalid infoType' });
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ error: err.message });
        }
        // Ensure the result is an array of objects
        const data = result.rows;
        return res.json({ data });
    });
};

export default { Mean };