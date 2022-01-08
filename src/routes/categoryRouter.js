import { Router } from 'express';
import * as categoryController from '../controllers/categoryControler.js';

const router = Router();

router.get('', categoryController.getCategoriesByType)
router.get('/stats', categoryController.getCategoryStatsByType);

export default router;
