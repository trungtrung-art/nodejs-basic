import express from 'express'
import configViewEngine from './configs/configViewengine'
import initWebRouter from './routes/web'
import initApiRouter from './routes/api'
import connection from './configs/connectDB'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 8080; // backup with port 8080 if you forget import dotenv

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//setup view engine
configViewEngine(app)

//init web router
initWebRouter(app)

//init api router
initApiRouter(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})