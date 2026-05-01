import redis from 'redis';

// Initialize Redis client (defaults to 127.0.0.1:6379)
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect(); // Connect to Redis
})();

export default client;
