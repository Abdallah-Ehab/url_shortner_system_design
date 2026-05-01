import { Pool } from 'pg';

// Replace with your actual database credentials
const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST || 'localhost', // Use environment variable or default to localhost
  database: 'url_shortener',
  password: process.env.DB_PASSWORD, // Store your DB password in an environment variable
  port: 5432, // Default Postgres port
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
