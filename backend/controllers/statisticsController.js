const db = require(`../config/dbconfig`);

const Mean = (req, res) => {
    const state = req.query.state;
    const district = req.query.district;
    const parameter = req.query.parameter;
    const start = req.query.startingYear;
    const end = req.query.endingYear;
    const info = req.query.infoType;

    if(info === 'Annual_Mean') {
        const sql = `SELECT year , (jan + feb + mar + apr + may + jun + jul + aug + sep + oct + nov + dec)/12
        FROM ${parameter} 
        WHERE state = ${state} AND district = ${district} AND year >= ${start} AND year <= ${end}`;
        db.query(sql, (err, result) => {
            if(err) {
                return res.json({ error: err });
            }
            return res.json({ result });
        });
    }
    else if(info === 'Monthly_Mean') {
        const sql = `SELECT AVG(jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec)
        FROM ${parameter} 
        WHERE state = ${state} AND district = ${district} AND year >= ${start} AND year <= ${end}`;
        db.query(sql, (err, result) => {
            if(err) {
                return res.json({ error: err });
            }
            return res.json({ result });
        });
    }
    else if(info === 'Annual_Total') {
        const sql = `SELECT year , (jan + feb + mar + apr + may + jun + jul + aug + sep + oct + nov + dec)
        FROM ${parameter} 
        WHERE state = ${state} AND district = ${district} AND year >= ${start} AND year <= ${end}`;
        db.query(sql, (err, result) => {
            if(err) {
                return res.json({ error: err });
            }
            return res.json({ result });
        });
    }
    else {
        return res.json({ error: 'Invalid infoType' });
    }
}

module.exports = { Mean };


