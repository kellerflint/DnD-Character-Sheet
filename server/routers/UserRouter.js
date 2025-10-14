import { Router } from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
} from '../controllers/UserController.js';

const router = Router();

// Auth routes
router.post('/login', loginUser);
router.get('/login', (req, res) =>  {
    res.send("Sane.");
});
router.post('/signup', createUser);

// CRUD routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

