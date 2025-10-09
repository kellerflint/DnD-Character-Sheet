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
router.post("/characters", createCharacter);
router.get("/characters", getAllCharacters);
router.get("/characters/:id", getCharacterById);
router.put("/characters/:id", updateCharacter);
router.delete("/characters/:id", deleteCharacter);

export default router;