import { createClient } from 'redis';

// Use the environment variable provided by Docker Compose,
// or fall back to localhost for local development outside Docker.
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
    url: REDIS_URL
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    try {
        await client.connect();
        console.log(`Connected to Redis at ${REDIS_URL}`);
    } catch (err) {
        console.error('Could not connect to Redis', err);
    }
})();

export default client;