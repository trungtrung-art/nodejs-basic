import express from "express";
import { getHomepage,getDetailUser,createNewUser,deleteUser,getEditUser,putUpdateUser } from "../controller/homeController";

let router = express.Router();

const initWebRouter = (app) => {
  //setup router with design patten MVC without model
  router.get('/', getHomepage);

  router.get('/detail/user/:userId', getDetailUser);

  router.post('/create-new-user', createNewUser);

  router.post('/delete/user/:userId',deleteUser)

  router.get('/edit-user/:userId',getEditUser)

  router.post('/update-user/:userId',putUpdateUser)
  
  router.get('/about', (req, res) => {
    res.send('HI IM TRUNGTRUNGCUM')
  })

  return app.use('/',router)
}

export default initWebRouter;