import router from 'express'
import UrlController from '../controllers/url.controller.js'
import { IDProvider } from '../services/id_provider.service.js'
import redisClient from '../redis.client.js'


export default function createUrlRouter(idProvider) {
    const router = router();

    const urlController = new UrlController(idProvider);

    router.post('/shorten', urlController.createShortUrl);
    router.get('/:shortUrl', urlController.redirectToOriginalUrl);

    return router;
}