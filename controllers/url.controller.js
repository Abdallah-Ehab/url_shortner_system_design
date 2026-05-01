import Url from '../models/url.model.js';
import db from '../db_connection.js';
import {encodeBase62} from '../services/encode.service.js';

export default class UrlController {
    constructor(idProvider) {
        this.idProvider = idProvider;
    }

    createShortUrl = async (req, res) => {
        try {
            const { originalUrl } = req.body;

            // Ask the injected provider for the ID
            const id = await this.idProvider.getNextID();
            const hash = encodeBase62(id);

            await db.query(
                'INSERT INTO urls (id, hash, original_url) VALUES ($1, $2, $3)',
                [id.toString(), hash, originalUrl]
            );

            res.status(201).json({ status: 'success', shortUrl: hash });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}