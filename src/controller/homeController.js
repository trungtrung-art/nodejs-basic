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
  console.log(req.body)
  const {firstName,lastName,email,address} = req.body;
  await connection.execute(`INSERT INTO users (firstName, lastName, email, address) VALUES ('${firstName}','${lastName}','${email}','${address}')`)
  return res.redirect('/')
}