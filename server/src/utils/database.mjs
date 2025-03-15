import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();
// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  if (connection) connection.release(); // Release the connection back to the pool
  console.log("Connected to MySQL database pool");
});

module.exports = pool.promise();
