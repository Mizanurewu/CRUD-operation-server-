const express = require('express');
const mysql = require('mysql');
// const bodyParser = require('body-parser');
const cors=require('cors')
const app = express();
app.use(express.json())
// const bodyParser=require('body-parser');
const port= process.env.PORT || 5000;

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bfinIT',
  });

app.get('/',(req,res)=>{
    res.send('Bfin it server running');
 })

 app.post('/business', (req, res) => {
  const newses = req.body;
  console.log(newses);
  const { name, email, contact } = newses;
  const sql = 'INSERT INTO employee (name, email, contact) VALUES (?, ?, ?)';
  const params = [name, email, contact];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error('Error saving data to database:', err);
      res.status(500).send('Error saving data to database');
      return;
    }
    console.log('Data saved to database!');
    res.send('Data saved to database!');
  });
});





 //get data from local database mysql(xampp)
    app.get('/users',(req,res)=>{
        const sql = `SELECT * FROM employee`;
        db.query(sql, (err, data) => {
           if(err) return res.json(err);
           return res.json(data);
          });
    })


app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
