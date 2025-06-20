const mysql = require( 'mysql2/promise');

const db = mysql.createPool({
    // socketPath: '/var/run/mysqld/mysqlx.sock',
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'textbook_marketplace'
});
module.exports = db;

CREATE TABLE Dogs (
    dog_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    size ENUM('small', 'medium', 'large') NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);
