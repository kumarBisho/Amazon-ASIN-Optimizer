import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

let pool: mysql.Pool;

export const connectDB = () => {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydb',
    connectionLimit: 10
  });

  console.log("✅ MySQL connected successfully");
};

export const getDB = () => pool;
