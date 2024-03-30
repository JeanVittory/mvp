import { Router } from 'express';
import { registerOutflows } from '../controllers/sales/registerOutflows.controllers';
import { validateOutflowMiddleware } from '../middlewares/validateOutflow.middleware';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';
import { validateElectronicIncome } from '../middlewares/validateElectronicIncome.middleware';
import { registerElectronicIncome } from '../controllers/sales/registerElectronicIncomes.controller';

const salesRouter = Router();

salesRouter.post('/outflows', authorizationMiddleware, validateOutflowMiddleware, registerOutflows);
salesRouter.post(
	'/electronic-income',
	authorizationMiddleware,
	validateElectronicIncome,
	registerElectronicIncome
);

export { salesRouter };
