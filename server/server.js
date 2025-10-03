import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';

dotenv.config();
const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3001;                // server's port
const OPEN5E_BASE = 'https://api.open5e.com';                       // DnD 5th Edition Open API
const FE_ORIGIN = process.env.FE_ORIGIN || 'http://localhost:3000'  // frontend's origin

app.use(express.json());

// Middleware: allow cross-origin requests from the Next.js frontend
app.use(
    cors({
        origin: FE_ORIGIN,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    })
);

// Middleware: log requests
// - "dev" gives detailed colored logs (for development)
// - "tiny" gives minimal logs (for production)
app.use(process.env.NODE_ENV === 'production' ? morgan('tiny') : morgan('dev'));


const characterInfo = new Set("level", "class", "race", "")

