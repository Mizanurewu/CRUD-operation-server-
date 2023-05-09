const express = require('express');
const mysql = require('mysql');
// const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(express.json())
// const bodyParser=require('body-parser');
const port = process.env.PORT || 5000;

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bfinIT',
});

app.get('/', (req, res) => {
  res.send('Bfin it server running');
})


app.post('/news', (req, res) => {
  const allNewsData = req.body;
  if(allNewsData.length<=0){
    return;
  }
  

  for (let i = 0; i < allNewsData.data.length; i++) {
    const { id, author, content, date, imageUrl, time, title } = allNewsData.data[i];
    const sql = 'INSERT INTO allnews (id, author, content,date,imageUrl,time,title) VALUES (?, ?, ?,?,?,?,?)';
    const params = [id, author, content, date, imageUrl, time, title];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error('Error saving data to database:', err);
        res.status(500).send('Error saving data to database');
        return;
      }
      console.log('Data saved to database!');
      // res.send(result);
    });
  }

});


//final
// app.post('/news', (req, res) => {
//   const allNewsData = req.body;
//   console.log(allNewsData.data);
//   const { id, author, content, date, imageUrl, time, title } = allNewsData.data;
//   const sql = 'INSERT INTO allnews (id, author, content,date,imageUrl,time,title) VALUES (?, ?, ?,?,?,?,?)';
//   const params = [id, author, content, date, imageUrl, time, title];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       console.error('Error saving data to database:', err);
//       res.status(500).send('Error saving data to database');
//       return;
//     }
//     console.log('Data saved to database!');
//     res.send(result);
//   });

// });


// app.post('/business', (req, res) => {
//   const newses = req.body;
//   console.log(newses);
//   const { id, author, content, date, imageUrl, time, title } = newses;
//   const sql = 'INSERT INTO allnews (id, author, content,date,imageUrl,time,title) VALUES (?, ?, ?,?,?,?,?)';
//   const params = [id, author, content, date, imageUrl, time, title];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       console.error('Error saving data to database:', err);
//       res.status(500).send('Error saving data to database');
//       return;
//     }
//     console.log('Data saved to database!');
//     res.send(result);
//   });
// });
app.put('/update/:id', (req, res) => {
  const { author, title, imageUrl, time, date, content } = req.body;
  console.log(content)
  const id = req.params.id;
  const sqlUpdate = "UPDATE allnews SET author=?, title=?, imageUrl=?, time=?, date=?, content=? WHERE id = ?";
  db.query(sqlUpdate, [author, title, imageUrl, time, date, content, id], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Record updated successfully!');
  });
});


app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM allnews WHERE id = ?`;

  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(result);
      res.sendStatus(200);
    }
  });
});


app.get("/news/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM allnews WHERE id = ?";

  db.query(query, id, (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.status(404).send({ message: "News not found" });
    }
  });
});

app.get("/update-news/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM allnews WHERE id = ?";

  db.query(query, id, (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.status(404).send({ message: "News not found" });
    }
  });
});



//get data from local database mysql(xampp)
app.get('/news', (req, res) => {
  const sql = `SELECT * FROM allnews`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
