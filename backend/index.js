import express from 'express';
import cors from 'cors';
import pool from './db/config.js';
import statisticsRoute from './routes/statisticsRoute.js';
import visualizationsRoute from './routes/visualizationsRoute.js';
import { initializeRedis, redisClient } from './utils/redis.js';

const app = express();
const PORT = process.env.PORT || 8080;

initializeRedis();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        client.query('SELECT NOW()', (err, result) => {
            release();
            if (err) {
                console.error('Error executing query', err.stack);
            } else {
                console.log('Connected to PostgreSQL:', result.rows);
            }
        });
    }
});

// Attach Redis client to each request
app.use((req, res, next) => {
    req.redisClient = redisClient;
    next();
});

app.use('/api/statistics', statisticsRoute);
app.use('/api/visualizations', visualizationsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
