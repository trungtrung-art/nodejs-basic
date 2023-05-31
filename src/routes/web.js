import express from "express";
import { getHomepage } from "../controller/homeController";

let router = express.Router();

const initWebRouter = (app) => {
  //setup router with design patten MVC without model
  router.get('/', getHomepage)
  
  router.get('/about', (req, res) => {
    res.send('HI IM TRUNGTRUNGCUM')
  })

  return app.use('/',router)
}

export default initWebRouter;