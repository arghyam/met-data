import db from "../db/config.js";
import { getCache, setCache } from "../utils/redis.js";

const toSnakeCase = (str) => {
    return str
        .split(' ')
        .map(word => word.toLowerCase())
        .join('_');
};

const Plot = async (req, res) => {
    const state = req.query.state;
    const district = req.query.district;
    const parameter = toSnakeCase(req.query.parameter);
    const start = req.query.startingYear;
    const end = req.query.endingYear;
    const info = toSnakeCase(req.query.infoType);

    const cacheKey = `plotdata:${parameter}`;

    try {
        const cachedData = await getCache(req.redisClient, cacheKey);
        if (cachedData) {
            return res.json(cachedData);
        }

        let sql = "";
        if (info === "trend_plot") {
            sql = `
                SELECT year, state, district, january, february, march, april, may, june, july, august, september, october, november, december
                FROM public.${parameter}
                ORDER BY year;
            `;

            db.query(sql, async (err, result) => {
                if (err) {
                    return res.json({ error: "An error occurred" });
                }
                const plotdata = result.rows.map((row) => ({
                    year: row.year,
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
                    }
                }));

                await setCache(req.redisClient, cacheKey, plotdata);

                res.json(plotdata);
            });
        }
    } catch (err) {
        console.error('Redis error:', err);
        res.json({ error: "An error occurred" });
    }
};

export default { Plot };
