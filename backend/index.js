import express from 'express';
import cors from 'cors';
import pool from './db/config.js';
import statisticsRoute from './routes/statisticsRoute.js';
import visualizationsRoute from './routes/visualizationsRoute.js';
import { createClient } from 'redis';

const app = express();
const PORT = process.env.PORT || 8080;

const redisClient = createClient({
    url: 'redis://127.0.0.1:6379'
});

async function initializeRedis() {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
}

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

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

app.use((req, res, next) => {
    req.redisClient = redisClient;
    next();
});

app.use('/api/statistics', statisticsRoute);
app.use('/api/visualizations', visualizationsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
