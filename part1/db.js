const mysql = require( 'mysql2/promise');

const db = mysql.createPool({
    // socketPath: '/var/run/mysqld/mysqlx.sock',
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'textbook_marketplace'
});
module.exports = db;