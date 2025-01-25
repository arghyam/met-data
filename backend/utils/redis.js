import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redisClient = createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

export async function initializeRedis() {
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

export const getCache = async (client, key) => {
    try {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error('Redis get error:', err);
        return null;
    }
};

export const setCache = async (client, key, value, expiration = 3600) => {
    try {
        await client.set(key, JSON.stringify(value), { EX: expiration });
    } catch (err) {
        console.error('Redis set error:', err);
    }
};