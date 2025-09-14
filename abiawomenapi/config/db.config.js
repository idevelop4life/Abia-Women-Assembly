require("dotenv").config();

const { Pool } = require("pg");

// Always use DATABASE_URL if provided — ignore local config entirely on Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false,
        }
      : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};