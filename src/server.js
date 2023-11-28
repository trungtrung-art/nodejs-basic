import express from 'express'
import configViewEngine from './configs/configViewengine'
import initWebRouter from './routes/web'
import initApiRouter from './routes/api'
import connection from './configs/connectDB'

import 'dotenv/config'
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 8080; // backup with port 8080 if you forget import dotenv

app.use((req, res, next) => {
  console.log('>> run into my middleware')
  console.log(req.method)
  next()
})

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app)

//init web router
initWebRouter(app)

//init api router
initApiRouter(app)

// handle 404 not found
app.use((req, res) => {
  return res.render('404.ejs')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})