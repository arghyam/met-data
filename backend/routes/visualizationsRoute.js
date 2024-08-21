import express from 'express';
const router = express.Router();
import visualizationController from '../controllers/visualizationsController.js';

router.get('/', visualizationController.Plot);

export default router;