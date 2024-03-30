import { Router } from 'express';
import { registerOutflow } from '../controllers/sales/registerOutflow.controllers';
import { validateOutflowMiddleware } from '../middlewares/validateOutflow.middleware';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';
import { electronicIncomeMiddleware } from '../middlewares/validateElectronicIncome.middleware';
import { registerElectronicIncome } from '../controllers/sales/registerElectronicIncome.controller';
import { inCashIncomeMiddleware } from '../middlewares/inCashIncome.middlewares';
import { registerIncashIncome } from '../controllers/sales/registerIncashIncome.controllers';

const salesRouter = Router();

salesRouter.post('/outflows', authorizationMiddleware, validateOutflowMiddleware, registerOutflow);
salesRouter.post(
	'/electronic-income',
	authorizationMiddleware,
	electronicIncomeMiddleware,
	registerElectronicIncome
);
salesRouter.post(
	'/cash-income',
	authorizationMiddleware,
	inCashIncomeMiddleware,
	registerIncashIncome
);

export { salesRouter };
