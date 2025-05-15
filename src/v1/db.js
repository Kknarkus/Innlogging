const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user:  'root',
  password: 'skole123',
  database: 'login_db'
});



module.exports = pool;