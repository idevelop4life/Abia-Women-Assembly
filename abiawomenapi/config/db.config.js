require("dotenv").config();
const { Pool } = require("pg");

const localConfig = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "abiaWomen",
  password: process.env.DB_PASSWORD, // Required
  port: process.env.DB_PORT || 5432,
};

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? {
                rejectUnauthorized: false,
              }
            : false,
      }
    : localConfig,
);
