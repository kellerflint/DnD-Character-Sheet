import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';

dotenv.config({
    path: '/.env'
});

const OPEN5E_BASE = process.env.OPEN5E_BASE || 'https://api.open5e.com';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan());

const PORT = process.env.PORT || 3001;

const characterInfo = new Set("level", "class", "race", "")

