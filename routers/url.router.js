import router from 'express'
import UrlController from '../controllers/url.controller.js'
import { IDProvider } from '../services/id_provider.service.js'
import redisClient from '../redis.client.js'

const urlRouter = router()


const idProvider = new IDProvider(redisClient);
const urlController = new UrlController(idProvider);

urlRouter.post('/shorten', urlController.createShortUrl)
urlRouter.get('/:shortUrl', urlController.redirectToOriginalUrl)

export default urlRouter