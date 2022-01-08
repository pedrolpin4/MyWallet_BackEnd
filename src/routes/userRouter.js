import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = Router();

router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);

export default router;
