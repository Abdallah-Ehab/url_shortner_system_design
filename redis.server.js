import express from 'express';
import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.CACHE_PORT || 3003; // Port for the Redis server

// Initialize Redis client (defaults to 127.0.0.1:6379)
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect(); // Connect to Redis
})();
