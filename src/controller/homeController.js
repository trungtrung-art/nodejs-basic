import connection from '../configs/connectDB'

export const getHomepage = async (req, res) => {

  const [rows,fields]= await connection.execute('SELECT * FROM users')
  return res.render('index.ejs', { dataUser: rows })
  
}

export const getDetailUser = async (req, res) => {
  console.log('check query pramns', req.params)
  const {userId} = req.params;
  console.log(userId)
  const [user,fields]= await connection.execute(`SELECT * FROM users WHERE id = ${userId}`)
  console.log(user)
  return res.send(JSON.stringify(user[0]))
  
}