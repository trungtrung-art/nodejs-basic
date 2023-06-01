import connection from '../configs/connectDB'

export const getHomepage = (req, res) => {
  // logic
  // simple query
  let data = []
  connection.query(
    'SELECT * FROM `users`',
    function (err, results, fields) {
      console.log('>> connect successfully', err)
      console.log(results); // results contains rows returned by server
      results.map(row => {
        data.push(
          {
            id: row.id,
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            address: row.address,
          }

        )
      })

      return res.render('index.ejs', { data: JSON.stringify(data) })
    }
  );
  
}