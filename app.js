const express = require('express');
const cors = require('cors');
const { initDb } = require('./initDb');
const studentRoutes = require('./routes/students');
const { end } = require('./db');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database', err);
    process.exit(1);
  });

process.on('SIGINT', async () => {
  console.log('\nGracefully shutting down...');
  await end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nGracefully shutting down...');
  await end();
  process.exit(0);
});
