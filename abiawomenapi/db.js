const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER || "myabiaWomen",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "abiaWomen",
  password: process.env.DB_PASSWORD || "your_db_password",
  port: process.env.DB_PORT || 5432,
});

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_HOST:", process.env.DB_HOST);

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
