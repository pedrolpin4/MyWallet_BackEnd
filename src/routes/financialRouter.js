import { Router } from 'express';
import * as financialController from '../controllers/financialEventsController.js';

const router = Router();

router.get('/cash-flow', financialController.getIncomesAndExpenses);
router.post('/incomes', financialController.postIncome);
router.post('/expenses', financialController.postExpense);

export default router;
