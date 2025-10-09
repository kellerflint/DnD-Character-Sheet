import express from 'express';
import router from './router/router.js';

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// API routes
app.use("/api", router);

// Serve static files from public directory (this should be last)
app.use(express.static('public'));

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on http://0.0.0.0:${port}`);
});
