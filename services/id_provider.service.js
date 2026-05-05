


export class IDProvider {

    static instance = null;
    static getInstance(redisClient, rangeSize) {
        if (!IDProvider.instance) {
            IDProvider.instance = new IDProvider(redisClient, rangeSize);
        }
        return IDProvider.instance;
    }
    constructor(redisClient, rangeSize = 1000n) {
        this.redis = redisClient;
        this.rangeSize = rangeSize;
        this.currentID = 0n;
        this.maxID = 0n;
    }

    async getNextID() {
        if (this.currentID >= this.maxID) {
            await this.refreshRange();
        }
        return ++this.currentID;
    }

    async refreshRange() {
        // Atomic range claim from Redis
        const newUpperBound = await this.redis.incrBy('global_id_counter', Number(this.rangeSize));
        this.maxID = BigInt(newUpperBound);
        this.currentID = this.maxID - this.rangeSize;
    }
}