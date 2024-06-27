const express = require('express')
const mysql = require('mysql2/promise')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

let conn = null
// Create the connection to database
const connectMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'income-expense'
  })
}

const port = 3000

const getDateNow = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero indexed, so we add 1
  let day = ('0' + date.getDate()).slice(-2);
  let formattedDate = `${year}-${month}-${day}`;
  // console.log(formattedDate);
  return formattedDate;
}

app.get('/api', async (req, res) => {
  try {
    let results = await conn.query('SELECT * FROM statistic')
    res.json(results[0])
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/category', async (req, res) => {
  try {
    let results = await conn.query('SELECT * FROM category')
    res.json(results[0])
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/type', async (req, res) => {
  try {
    let results = await conn.query('SELECT * FROM type')
    res.json(results[0])
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/today-list', async (req, res) => {
  try {
    let today = await getDateNow()
    let results = await conn.query(`
      SELECT id, name, amount, category.cat_id as cat_id, category.cat_name as cat_name, type_id, date  FROM statistic 
      JOIN category ON statistic.cat_id = category.cat_id
      WHERE date LIKE ?`, today+'%')
    res.json(results[0])
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/today-cat', async (req, res) => {
  try {
    let today = await getDateNow()
    let results = await conn.query(`
      SELECT category.cat_id AS cat_id, category.cat_name AS cat_name
      FROM statistic
      JOIN category ON statistic.cat_id = category.cat_id
      WHERE date LIKE ?
      GROUP BY category.cat_id, category.cat_name
      `, today+'%')
    res.json(results[0])
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/today-amount', async (req, res) => {
  try {
    let today = await getDateNow()
    let results = await conn.query(`
      SELECT category.cat_id, category.cat_name, SUM(statistic.amount) AS total
      FROM statistic
      JOIN category ON statistic.cat_id = category.cat_id
      WHERE statistic.date LIKE ?
      GROUP BY category.cat_id, category.cat_name;
      `, today+'%')
    res.json(results[0])
  } catch (error) {
    console.error(error)
  }
})


app.post('/api/add', async (req, res) => {
  const data = req.body
  try {
    const result = await conn.query('INSERT INTO statistic SET ?', data)
    res.status(201).json({ message: 'successfully'})
  } catch (error) {
    console.error(error)
  }
})

app.listen(port, async () => {
  await connectMySQL()  

  console.log(`Server started on port ${port}`)
  console.log("Get all data: localhost:3000/api");
  console.log("Get today data: localhost:3000/api/today-list");
  console.log("Get today category: localhost:3000/api/today-cat");
  console.log("Get today category: localhost:3000/api/today-amount");
  console.log("Add data: localhost:3000/api/add");
  console.log("Get category: localhost:3000//api/category");
  console.log("Get type: localhost:3000//api/type");
})