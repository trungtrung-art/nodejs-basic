import express from "express";
import { getHomepage, getDetailUser, createNewUser, deleteUser, getEditUser, putUpdateUser, getUploadFilesPage, handleUploadFile } from "../controller/homeController";
import multer from "multer";
import path from "path";

var appRoot = require('app-root-path')
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + '/src/public/image/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

// helper function
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRouter = (app) => {
  //setup router with design patten MVC without model
  router.get('/', getHomepage);
  router.get('/home', getHomepage);

  router.get('/detail/user/:userId', getDetailUser);

  router.post('/create-new-user', createNewUser);

  router.post('/delete/user/:userId', deleteUser)

  router.get('/edit-user/:userId', getEditUser)

  router.post('/update-user/:userId', putUpdateUser)

  router.get('/about', (req, res) => {
    res.send('HI IM TRUNGTRUNGCUM')
  })

  router.get('/upload', getUploadFilesPage);
  router.post('/upload-profile-pic', upload.single('profile_pic'), handleUploadFile)

  return app.use('/', router)
}

export default initWebRouter;