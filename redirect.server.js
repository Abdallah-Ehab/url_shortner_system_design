import express from 'express';

const app = express()

app.use(express.json())

app.get('/:shortUrl', (req,res)=>{
  const {shortUrl} = req.params
  // I need to find the original url from the database
  // and then redirect to the original url
  // if the short url is not found in the database then I need to return 404
  res.redirect('https://www.google.com')
})

app.listen(3001, (req, res) => {
  console.log(`Redirect server is running on port 3001`)
})