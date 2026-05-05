import express from 'express'
import dotenv from 'dotenv'
import urlRouter from './routers/url.router.js'
import db_connection from './db_connection.js'
import redisClient from './redis_client.js'
dotenv.config()
const app = express()

app.use(express.json())
app.use('/api/url', urlRouter)

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

    app.listen(process.env.shorten, (req, res) => {
      console.log(`Server is running on port ${process.env.shorten}`)
    })
  }catch(e){
    console.error('Failed to start server', e)
  }

}

startServer();
