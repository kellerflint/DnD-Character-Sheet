import express from 'express';
import controller from '../controller/controller.js'

const router = express.Router();
const { getHome, createCharacter, getAllCharacters, getCharacterById, 
        updateCharacter, deleteCharacter } = controller;

// test
router.get('/', getHome);

// route for getting all and creating new characters
router.route('/characters')
    .get(getAllCharacters)
    .post(createCharacter);

// route for getting, updating, and deleting a single character by ID
router.route('/characters/:id')
    .get(getCharacterById)
    .put(updateCharacter)
    .delete(deleteCharacter);

export default router;