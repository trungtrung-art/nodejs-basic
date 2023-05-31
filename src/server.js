import express from 'express'
import configViewEngine from './configs/configViewengine'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 8080; // backup with port 8080 if you forget import dotenv

configViewEngine(app)

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})