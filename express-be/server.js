import express from 'express';
import router from './router/router.js';

const app = express();
const port = 3001;

app.use("/", router);

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));