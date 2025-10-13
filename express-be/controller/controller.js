import Character from '../models/Character.js';

// Database interactions / CRUD

// create
const createCharacter = async (req, res) => {
    try {
        const character = await Character.create(req.body);
        res.status(201).json(character);
    } catch (error) {
        res.status(400).json({ message: 'Error creating character', error: error.message });
    }
};

// read
const getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.findAll();
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching characters', error: error.message });
    }
};

const getCharacterById = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findByPk(id);
        
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }
        
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching character', error: error.message });
    }
};

// update
const updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Character.update(req.body, {
            where: { id: id }
        });
        
        if (updated) {
            const updatedCharacter = await Character.findByPk(id);
            res.status(200).json(updatedCharacter);
        } else {
            res.status(404).json({ message: 'Character not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating character', error: error.message });
    }
};

// delete
const deleteCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Character.destroy({
            where: { id: id }
        });
        
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Character not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting character', error: error.message });
    }
};


// Work in progress...
// const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
        
//         // Basic validation
//         if (!username || !password) {
//             return res.status(400).json({ message: 'Username and password are required' });
//         }
        
//         // For now, just return success (we'll add real authentication later)
//         res.status(200).json({ 
//             message: 'Login successful', 
//             user: { username } 
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };


export default {
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter
};