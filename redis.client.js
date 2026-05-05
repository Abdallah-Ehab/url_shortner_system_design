import { createClient } from 'redis';

// Use the environment variable provided by Docker Compose,
// or fall back to localhost for local development outside Docker.
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
    url: REDIS_URL
});

client.on('error', (err) => console.log('Redis Client Error', err));


export default client;