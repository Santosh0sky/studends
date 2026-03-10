const { pool } = require('./db');

async function initDb() {
  // Ensure the database exists first (in case the user has not created it).
  // This is a no-op if the database already exists.
  const dbName = process.env.DB_NAME || 'students_db';

  // Create a temporary connection without specifying database
  const mysql = require('mysql2/promise');
  const tmp = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  await tmp.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  await tmp.end();

  // Create students table if it does not exist
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS \`${dbName}\`.students (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      age INT NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await pool.query(createTableSql);

  console.log('✅ Database and students table are ready');
}

module.exports = { initDb };
