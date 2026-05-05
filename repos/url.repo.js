class UrlRepo {
    constructor(db) {
        this.db = db;
    }

    async createUrl(id, hash, originalUrl) {
        await this.db.query(
            'INSERT INTO urls (id, hash, original_url) VALUES ($1, $2, $3)',
            [id.toString(), hash, originalUrl]
        );
    }

    async findOriginalUrlByHash(hash) {
        const result = await this.db.query('SELECT original_url FROM urls WHERE hash = $1', [hash]);
        return result.rows.length > 0 ? result.rows[0].original_url : null;
    }
}