import express from 'express'
import dotenv from 'dotenv'
import urlRouter from './routers/url.router.js'
dotenv.config()
const app = express()

app.use(express.json())
app.use('/api/url', urlRouter)

app.get('/api/healthCheck', (req, res) => {
  // I need to ping all the services
  // but what is the main service
  res.send('service is up and running')
})


app.listen(process.env.shorten, (req, res) => {
  console.log(`Server is running on port ${process.env.shorten}`)
})
