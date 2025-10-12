import { Router } from 'express';
import userRouter from './UserRouter.js'

const apiRouter = Router();

apiRouter.use('/users', userRouter);

apiRouter.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'D&D Character Sheet API is running',
        timestamp: new Date().toISOString()
    });
});

export default apiRouter;