import connection from '../configs/connectDB'

export const getAllUsers = async (req,res) => {

  const [rows,fields]= await connection.execute('SELECT * FROM users')

  return res.status(200).json({ // Need re-search more status
    message: 'ok',
    data: rows
  })
}

export const createNewUser = async (req,res) => {
  const {firstName,lastName,email,address} = req.body;
  
  if(!firstName || !lastName || !email || !address){
    return res.status(200).json({ // Need re-search more status
      message: 'missing required params',
    })
  }

  await connection.execute(`INSERT INTO users (firstName, lastName, email, address) VALUES ('${firstName}','${lastName}','${email}','${address}')`)

  return res.status(200).json({ // Need re-search more status
    message: 'ok',
  })
}

export const putUpdateUser= async (req,res) => {
  const {firstName,lastName,email,address} = req.body;
  if(!firstName || !lastName || !email || !address){
    return res.status(200).json({ // Need re-search more status
      message: 'missing required params',
    })
  }
  const {userId} = req.params;
  if(!userId){
    return res.status(200).json({ // Need re-search more status
      message: 'missing required params',
    })
  }

  await connection.execute(`UPDATE users SET firstName='${firstName}',lastName='${lastName}',email='${email}',address='${address}' WHERE id=${userId}`)

  return res.status(200).json({ // Need re-search more status
    message: 'ok',
  })
}

export const deleteUser = async (req,res)  => {
  const {userId} = req.params;
  if(!userId){
    return res.status(200).json({ // Need re-search more status
      message: 'missing required params',
    })
  }
  await connection.execute(`DELETE FROM users WHERE id = ${userId}`)

  return res.status(200).json({ // Need re-search more status
    message: 'ok',
  })
}