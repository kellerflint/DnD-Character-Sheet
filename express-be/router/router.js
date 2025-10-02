import express from 'express';
import controller from '../controller/controller.js'

const router = express.Router();

const { getResource, getHome } = controller;

router.get("/", getHome);
router.get("/resource", getResource);

export default router;