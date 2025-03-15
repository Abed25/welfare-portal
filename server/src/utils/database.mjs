import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();
// Create a MySQL connection pool
const pool = mysql.createPool({
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on expected traffic
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

// host: process.env.DB_HOST,
// user: process.env.DB_USER,
// password: process.env.DB_PASSWORD,
// database: process.env.DB_NAME,
// port: process.env.DB_PORT,
