const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
});

pool.on('connect', () => {
  console.log('Connected to the database.');
});

module.exports = pool;
