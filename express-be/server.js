import express from 'express';
import router from './router/router.js';
import sequelize from './database/database.js';
import Character from './models/Character.js'; // for sequelize to sync with model
import chalk from 'chalk'; // cli cosmetic for dev logs readability
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// If the frontend has been built, serve it as static assets from Express so we can run a single process.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '..', 'react-fe', 'dist');
const clientIndex = path.join(clientDistPath, 'index.html');
const shouldServeClient = fs.existsSync(clientDistPath) && fs.existsSync(clientIndex);
if (shouldServeClient) {
    app.use(express.static(clientDistPath));
    // Serve index.html for any route not handled by the API (SPA fallback)
    app.get('*', (req, res, next) => {
        // If request path starts with /api or /characters or similar, skip to API router
        // Our API routes are mounted at '/' in router; to avoid conflicts, only serve index for non-API
        const acceptsHtml = req.accepts('html');
        if (!acceptsHtml) return next();
        res.sendFile(clientIndex);
    });
}

app.use(express.json());
app.use(cors());

app.use("/", router);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(chalk.cyan("Connection to database established"));

        await sequelize.sync();
        console.log(chalk.cyan("All models were synchronized"));
        
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
            if (shouldServeClient) console.log(chalk.cyan('Serving frontend from:'), clientDistPath);
        });
    } catch (error) {
        console.error(`Unable to start the server: ${chalk.red(error)}`);
    }
};

startServer();