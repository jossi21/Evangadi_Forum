const dotenv = require("dotenv");

// Load correct .env file based on environment
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config();
}

const mysql2 = require("mysql2");
const fs = require("fs");

const isProduction = process.env.NODE_ENV === "production";

const dbConnection = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  ssl: isProduction
    ? {
        ca: fs.readFileSync("./certs/ca.pem"),
        rejectUnauthorized: true,
      }
    : false,
});

module.exports = dbConnection.promise();
