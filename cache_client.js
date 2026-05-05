class CacheClient{
    constructor(client){
        this.client = client;
    }

    async get(key){
        try{
            const value = await this.client.get(key);
            return value;
        }catch(e){
            console.error('Error getting value from Redis', e);
            throw e;
        }
    }

    async set(key, value, expirationInSeconds = 3600){
        try{
            await this.client.setEx(key, expirationInSeconds, value);
        }catch(e){
            console.error('Error setting value in Redis', e);
            throw e;
        }
    }
}

export default CacheClient;