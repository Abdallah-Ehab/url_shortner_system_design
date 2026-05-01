import router from 'express'
import UrlController from '../controllers/url.controller.js'

const urlRouter = router()


const urlController = new UrlController();

urlRouter.post('/shorten', (req,res)=>{})
urlRouter.get('/:shortUrl', (req,res)=>{})
urlRouter.get('/analytics/:shortUrl', (req,res)=>{})

export default urlRouter