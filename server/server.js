import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import sequelize from './database/connect.js'
import apiRouter from './routers/Router.js';

dotenv.config();
const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3001;                // server's port
const OPEN5E_BASE = 'https://api.open5e.com';                       // DnD 5th Edition Open API
const FE_ORIGIN = process.env.FE_ORIGIN || 'http://localhost:3000'  // frontend's origin

app.use(express.json());

// Middleware: allow cross-origin requests from the Next.js frontend
app.use(cors({  origin: FE_ORIGIN, methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));

// Middleware: log requests
// - "dev" gives detailed colored logs (for development)
// - "tiny" gives minimal logs (for production)
app.use(process.env.NODE_ENV === 'production' ? morgan('tiny') : morgan('dev'));

// Sync database (creates tables if they don't exist)
await sequelize.sync({ alter: true });
console.log('Database synced successfully');

app.use('/api', apiRouter);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "D&D Character Sheet API is running" });
});

const characterInfo = new Set(['races', 'classes', 'backgrounds', 'monsters', 'spells', 'magicitems', 'weapons', 'armor']);

// Open5e API proxy endpoints
app.get("/api/dnd/:reference", async (req, res) => {
    try {
    const { reference } = req.params;

    // Validate reference type
    if (!characterInfo.has(reference)) {
        return res.status(404).json({ 
            error: "Reference not available",
            characterInfo: Array.from(characterInfo)
        });
    }

        const url = `${OPEN5E_BASE}/${reference}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching from Open5e API:', error.message);
        res.status(500).json({ error: 'Failed to fetch D&D data' });
    }
});

// Start server
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});

