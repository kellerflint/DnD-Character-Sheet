import { Router } from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
    loginUser
} from '../controllers/UserController.js';

const loginRouter = Router();

// Auth routes
loginRouter.post('/login', loginUser);
loginRouter.post('/signup', createUser);

// CRUD routes
loginRouter.get('/', getAllUsers);
loginRouter.get('/:id', getUserById);
loginRouter.get('/user/:username', getUserByUsername);
loginRouter.put('/:id', updateUser);
loginRouter.delete('/:id', deleteUser);

export default loginRouter;

