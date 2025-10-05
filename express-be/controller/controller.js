import Character from '../models/Character.js';

const getHome = (req, res) => {
    res.status(200).send("Hello world!");
};

const getResource = (req, res) => {
    res.status(200).send("Resource retrieved!");
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        
        // For now, just return success (we'll add real authentication later)
        res.status(200).json({ 
            message: 'Login successful', 
            user: { username } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Character CRUD operations
const createCharacter = async (req, res) => {
    try {
        const characterData = req.body;
        const character = await Character.create(characterData);
        res.status(201).json(character);
    } catch (error) {
        res.status(500).json({ message: 'Error creating character', error: error.message });
    }
};

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

const updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const [updated] = await Character.update(updateData, {
            where: { id: id }
        });
        
        if (updated === 0) {
            return res.status(404).json({ message: 'Character not found' });
        }
        
        const updatedCharacter = await Character.findByPk(id);
        res.status(200).json(updatedCharacter);
    } catch (error) {
        res.status(500).json({ message: 'Error updating character', error: error.message });
    }
};

const deleteCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleted = await Character.destroy({
            where: { id: id }
        });
        
        if (deleted === 0) {
            return res.status(404).json({ message: 'Character not found' });
        }
        
        res.status(200).json({ message: 'Character deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting character', error: error.message });
    }
};

export default {
    getHome,
    getResource,
    login,
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter
};