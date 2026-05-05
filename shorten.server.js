import express from 'express'
import dotenv from 'dotenv'
import urlRouter from './routers/url.router.js'
import db_connection from './db_connection.js'
import redisClient from './redis.client.js'
import { IDProvider } from './services/id_provider.service.js'
import createUrlRouter from './routers/url.router.js'


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



const startServer = async () => {
  try{
    await redisClient.connect()
    console.log('Connected to Redis')

    const idProvider = IDProvider.getInstance(redisClient, 1000n);

    const urlRouter = createUrlRouter(idProvider);

    app.use('/api/url', urlRouter)

    app.listen(process.env.shorten, (req, res) => {
      console.log(`Server is running on port ${process.env.shorten}`)
    })
  }catch(e){
    console.error('Failed to start server', e)
  }

}

startServer();
