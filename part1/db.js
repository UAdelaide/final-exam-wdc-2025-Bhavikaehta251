const mysql = require( 'mysql2/promise');

const db = mysql.createPool({
    // socketPath: '/var/run/mysqld/mysqlx.sock',
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'textbook_marketplace'
});
module.exports = db;

// db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
