import connection from '../configs/connectDB'

export const getHomepage = async (req, res) => {

  const [rows,fields]= await connection.execute('SELECT * FROM users')
  return res.render('index.ejs', { dataUser: rows })
  
}

export const getDetailUser = async (req, res) => {
  const {userId} = req.params;
  const [user,fields]= await connection.execute(`SELECT * FROM users WHERE id = ${userId}`)
  return res.send(JSON.stringify(user[0]))
}

export const createNewUser = async (req,res) => {
  const {firstName,lastName,email,address} = req.body;
  await connection.execute(`INSERT INTO users (firstName, lastName, email, address) VALUES ('${firstName}','${lastName}','${email}','${address}')`)
  return res.redirect('/')
}

export const deleteUser = async (req,res)  => {
  const {userId} = req.params;
  await connection.execute(`DELETE FROM users WHERE id = ${userId}`)
  return res.redirect('/')
}

export const getEditUser = async (req,res) => {
  const {userId} = req.params;
  const [user,fields]= await connection.execute(`SELECT * FROM users WHERE id = ${userId}`)
  return res.render('update.ejs',{ dataUser: user[0] })
}

export const putUpdateUser= async (req,res) => {
  const {firstName,lastName,email,address} = req.body;
  const {userId} = req.params;
  await connection.execute(`UPDATE users SET firstName='${firstName}',lastName='${lastName}',email='${email}',address='${address}' WHERE id=${userId}`)
  return res.redirect('/')
}