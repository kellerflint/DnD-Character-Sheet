import express from 'express';
import controller from '../controller/controller.js'

const router = express.Router();

const { getResource } = controller; // destructure

// GET is HTTP method, /resource1 is "endpoint"
router.get("/resource", getResource);

export default router;