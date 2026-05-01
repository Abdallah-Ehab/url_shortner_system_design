import router from 'express'

const urlRouter = router()




urlRouter.post('/shorten', (req,res)=>{})
urlRouter.get('/:shortUrl', (req,res)=>{})
urlRouter.get('/analytics/:shortUrl', (req,res)=>{})

export default urlRouter