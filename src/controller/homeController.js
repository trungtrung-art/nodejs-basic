import connection from '../configs/connectDB'
import multer from 'multer';

export const getHomepage = async (req, res) => {

  const [rows, fields] = await connection.execute('SELECT * FROM users')
  return res.render('index.ejs', { dataUser: rows })

}

export const getDetailUser = async (req, res) => {
  const { userId } = req.params;
  const [user, fields] = await connection.execute(`SELECT * FROM users WHERE id = ${userId}`)
  return res.send(JSON.stringify(user[0]))
}

export const createNewUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  await connection.execute(`INSERT INTO users (firstName, lastName, email, address) VALUES ('${firstName}','${lastName}','${email}','${address}')`)
  return res.redirect('/')
}

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  await connection.execute(`DELETE FROM users WHERE id = ${userId}`)
  return res.redirect('/')
}

export const getEditUser = async (req, res) => {
  const { userId } = req.params;
  const [user, fields] = await connection.execute(`SELECT * FROM users WHERE id = ${userId}`)
  return res.render('update.ejs', { dataUser: user[0] })
}

export const putUpdateUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  const { userId } = req.params;
  await connection.execute(`UPDATE users SET firstName='${firstName}',lastName='${lastName}',email='${email}',address='${address}' WHERE id=${userId}`)
  return res.redirect('/')
}

export const getUploadFilesPage = async (req, res) => {
  return res.render('uploadFiles.ejs')
}


const upload = multer().single('profile_pic');

const uploadMultiple = multer().array('multiple_images', 10);

export const handleUploadFile = async (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
      return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
      return res.send(err);
    }
    else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
  });
}

export const handleUploadMultipleFile = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  else if (!req.files) {
    return res.send('Please select an image to upload');
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="./">Upload more images</a>';
  res.send(result);

}