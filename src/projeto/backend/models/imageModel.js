const { Pool } = require('pg');


const pool = new Pool({
  host: process.env.SUPABASE_HOST,
  port: process.env.SUPABASE_PORT,
  database: process.env.SUPABASE_DB,
  user: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
});


const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS images (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      base64 TEXT NOT NULL
    );
  `;
  await pool.query(query);
};

const insertImage = async (name, base64) => {
  const query = `INSERT INTO images (name, base64) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING;`;
  await pool.query(query, [name, base64]);
};


const fetchImages = async () => {
  const query = `SELECT * FROM images;`;
  const result = await pool.query(query);
  return result.rows;
};

module.exports = {
  pool,
  createTable,
  insertImage,
  fetchImages,
};
