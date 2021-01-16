const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.HOST,
  port: process.env.DB_PORT,
});

module.exports = pool;
