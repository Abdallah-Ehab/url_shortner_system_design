import express from 'express'
import dotenv from 'dotenv'
import db_connection from './db_connection.js'
import redisClient from './cache_client.js'
import { IDProvider } from './services/id_provider.service.js'
import createUrlRouter from './routers/url.router.js'
import EncoderService from './services/encode.service.js'
import UrlController from './controllers/url.controller.js'
import UrlRepository from './repos/url.repo.js'
import CacheClient from './cache_client.js'

dotenv.config()
const app = express()

app.use(express.json())

app.get('/api/healthCheck', async (req, res) => {
  try{
    await db_connection.query('SELECT 1')
    await redisClient.ping()
    res.status(200).json({status: 'success', message: 'All services are healthy'})
  }catch(error){
    res.status(500).json({status: 'error', message: error.message})
  }
})



const bootStrap = async () => {
  try{
    const client = redisClient.createClient();
    const redisClient = new CacheClient(client)
    console.log('Connected to Redis')

    const idProvider = IDProvider.getInstance(redisClient, 1000n);
    const urlRepository = new UrlRepository(db_connection);
    const encoderService = new EncoderService();

    const urlController = new UrlController(idProvider, redisClient, urlRepository, encoderService);

    const urlRouter = createUrlRouter(urlController);

    app.use('/api/url', urlRouter)

    app.listen(process.env.shorten, (req, res) => {
      console.log(`Server is running on port ${process.env.shorten}`)
    })
  }catch(e){
    console.error('Failed to start server', e)
  }

}

bootStrap();
