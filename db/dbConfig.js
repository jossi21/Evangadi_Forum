const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Load correct .env file based on environment
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config();
}

const mysql2 = require("mysql2");

const isProduction = process.env.NODE_ENV === "production";

// Only use SSL for production
let sslConfig = {};
if (isProduction) {
  sslConfig = { ssl: { rejectUnauthorized: false } };
} else {
  // Local development - no SSL
  sslConfig = {};
}

const dbConnection = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  ...sslConfig,
});

module.exports = dbConnection.promise();
