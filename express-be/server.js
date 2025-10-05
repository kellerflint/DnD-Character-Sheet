import express from 'express';
import router from './router/router.js';

const app = express();
const port = 3001;

// Serve static files from public directory
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

app.use("/", router);

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log('Server up');
});
