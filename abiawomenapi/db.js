const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // 👈 REQUIRED for Render's self-signed cert
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};