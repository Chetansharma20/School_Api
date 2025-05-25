// db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || sql12.freesqldatabase.com ,
  user: process.env.DB_USER ||sql12781076 ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME || sql12781076 ,
   port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = db;
