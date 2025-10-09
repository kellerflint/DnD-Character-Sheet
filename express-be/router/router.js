import express from 'express';
import controller from '../controller/controller.js'

const router = express.Router();

const { 
    getResource, 
    getHome, 
    login, 
    createCharacter, 
    getAllCharacters, 
    getCharacterById, 
    updateCharacter, 
    deleteCharacter 
} = controller;

router.get("/test", getHome);
router.get("/resource", getResource);
router.post("/login", login);

// Character CRUD routes
router.post("/api/characters", createCharacter);
router.get("/api/characters", getAllCharacters);
router.get("/api/characters/:id", getCharacterById);
router.put("/api/characters/:id", updateCharacter);
router.delete("/api/characters/:id", deleteCharacter);

export default router;