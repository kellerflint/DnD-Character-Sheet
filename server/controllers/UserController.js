import User from '../models/userSchema.js'

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Username, password, and email are required.' });
        }
        const hashed_pw = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await User.create({ username: username, email: email, password_hash: hashed_pw, password: password });

        res.status(201).json({
            message: 'User created successfully',
            user
        });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({ error: 'Username or email already exists.' });
        }
        console.log("Error creating user:", err);
        res.status(500).json({ error: "Internal Server Error "});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            order: [['created_at', 'DESC' ]]
        });
        res.json(users);
    } catch (err) {
        console.log("Error getting users:", err);
        res.status(500).json({ error: "Internal Server Error "});
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json(user);
    } catch (err) {
        console.log("Error getting user:", err);
        res.status(500).json({ error: "Internal Server Error "});
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Don't allow updating id or created_at
        const { id, created_at, ...updateData } = req.body;

        await user.update(updateData);

        res.json({
            message: 'User updated successfully',
            user
        });
    
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: 'Username or email already exists.'
            })
        }
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        await user.destroy();
        
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log("Error deleting user:", err);
        res.status(500).json({ error: "Internal Server Error "});
    }
}

const loginUser = async (req, res) => {
    try {
        // credential could be username or email
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username/email and password are required.' });
        }

        const isEmail = username.includes('@');

        const user = await User.findOne({
            where: isEmail
            ? { email: username.toLowerCase() }
            : { username: username }
        })
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const isValid = await user.checkPassword(password);

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials '})
        }

        await user.update({ last_login: new Date() });

        const userResponse = await User.findByPk(user.id);

        res.json({
            message: 'Login successful',
            user: userResponse
        });
    } catch (err) {
        console.log("Error logging in user:", err);
        res.status(500).json({ error: "Internal Server Error "});
    }
}

export {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
}