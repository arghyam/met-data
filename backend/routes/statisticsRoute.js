import express from 'express';
const router = express.Router();
import meanController from '../controllers/statisticsController.js';

router.get('/', meanController.Mean);  

export default router;
