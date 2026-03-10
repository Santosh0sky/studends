const { sequelize } = require('./sequelize');
const { initStudentTable } = require('./modules/students');

async function initDb() {
  // Ensure the database exists first (in case the user has not created it).
  // This is a no-op if the database already exists.
  const dbName = process.env.DB_NAME || 'students_db';

  // Create a temporary connection without specifying the database
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

  // Sync Sequelize models (creates tables if not present)
  await initStudentTable();

  console.log('✅ Database and Sequelize tables are ready');
}

module.exports = { initDb };
