import express from 'express';
import controller from '../controller/controller.js'

const router = express.Router();

const { getResource } = controller;

router.get("/resource", getResource);

export default router;