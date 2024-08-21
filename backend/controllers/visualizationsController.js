import db from '../db/config.js';

const Plot = (req, res) => {
    const state = req.query.state;
    const district = req.query.district;
    const parameter = req.query.parameter;
    const start = req.query.startingYear;
    const end = req.query.endingYear;
    const info = req.query.infoType;
    console.log(state, district, parameter, start, end, info);

    let sql = '';
    let values = [state, district, start, end];
    if(info == "trend_plot"){
        sql = `
            SELECT year, (january + february + march + april + may + june + july + august + september + october + november + december) / 12 AS value
            FROM public.${parameter}
            WHERE state = $1 AND district = $2 AND year >= $3 AND year <= $4
            ORDER BY year;
        `;

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.json({ error: 'An error occurred' });
            }
            const plotdata = result.rows.map(row => ({
                year: row.year,
                value: row.value
            }));
            res.json(plotdata);
        });
    }
}

export default { Plot };