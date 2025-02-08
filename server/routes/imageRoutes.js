import express from 'express';
import { generateImage } from '../controllers/imageController.js';
import userAuth from '../middlewares/auth.js';

const router = express.Router();

router.post('/generate', userAuth, generateImage);  // Protect this route

export default router;
