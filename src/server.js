import express from 'express'
import configViewEngine from './configs/configViewengine'
import initWebRouter from './routes/web'
import connection from './configs/connectDB'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 8080; // backup with port 8080 if you forget import dotenv

//setup view engine
configViewEngine(app)

//setup router
initWebRouter(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})