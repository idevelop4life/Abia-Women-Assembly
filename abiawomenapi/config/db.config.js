require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { 
        rejectUnauthorized: false,  // Required for Heroku, AWS, etc.
        // For stricter security, add these if available:
        // ca: process.env.DB_CA_CERT,
        // cert: process.env.DB_CLIENT_CERT,
        // key: process.env.DB_CLIENT_KEY
      } 
    : false  // Disable SSL for local development
});

module.exports = {
  /**
   * Execute a database query
   * @param {string} text - SQL query string
   * @param {Array} params - Query parameters
   * @returns {Promise<QueryResult>} - Query result
   */
  query: (text, params) => pool.query(text, params),
  
  /**
   * Close the database connection pool
   * @returns {Promise<void>}
   */
  end: () => pool.end(),
  
  // Optional: Export pool for special cases
  getPool: () => pool
};