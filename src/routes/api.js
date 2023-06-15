import express from "express";
import { getAllUsers,createNewUser,putUpdateUser,deleteUser } from "../controller/APIController";

let router = express.Router();

const initApiRouter = (app) => {
  //setup router with design patten MVC without model
  router.get('/users', getAllUsers); // method get -> READ data

  router.post('/create-new-user', createNewUser); // method post => CREATE data

  router.put('/update-user/:userId',putUpdateUser)// method put => UPDATE data

  router.delete('/delete/user/:userId',deleteUser) // method delete => DELETE data

  return app.use('/api/v1',router)
}

export default initApiRouter;