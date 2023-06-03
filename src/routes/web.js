import express from "express";
import { getHomepage,getDetailUser,createNewUser } from "../controller/homeController";

let router = express.Router();

const initWebRouter = (app) => {
  //setup router with design patten MVC without model
  router.get('/', getHomepage);

  router.get('/detail/user/:userId', getDetailUser);

  router.post('/create-new-user', createNewUser);
  
  router.get('/about', (req, res) => {
    res.send('HI IM TRUNGTRUNGCUM')
  })

  return app.use('/',router)
}

export default initWebRouter;