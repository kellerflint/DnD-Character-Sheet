import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mysql from 'mysql2';

dotenv.config();

const app = express();

// DB Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dnd'
})
