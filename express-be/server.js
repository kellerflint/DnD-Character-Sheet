import express from 'express';
import router from './router/router.js';

const app = express();

app.use("/server", router);

const port = 3001;
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));