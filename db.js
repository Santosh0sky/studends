const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: "123456",
  database:'students_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on('acquire', (connection) => {
  // Optional: log acquire events if debugging connection leaks
  // console.debug(`Connection ${connection.threadId} acquired`);
});

pool.on('release', (connection) => {
  // Optional: log release events if debugging connection leaks
  // console.debug(`Connection ${connection.threadId} released`);
});

module.exports = {
  pool,
  query: (...args) => pool.query(...args),
  getConnection: () => pool.getConnection(),
  end: () => pool.end(),
};
