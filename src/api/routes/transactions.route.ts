import { Router } from 'express';
import { registerOutflow } from '../controllers/transactions/registerOutflow.controllers';
import { validateOutflowMiddleware } from '../middlewares/validateOutflow.middleware';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';
import { electronicIncomeMiddleware } from '../middlewares/validateElectronicIncome.middleware';
import { registerElectronicIncome } from '../controllers/transactions/registerElectronicIncome.controller';
import { inCashIncomeMiddleware } from '../middlewares/inCashIncome.middlewares';
import { registerIncashIncome } from '../controllers/transactions/registerIncashIncome.controllers';
import { allTransactions } from '../controllers/transactions/getAllTransactions.controllers';
import { paginationMiddleware } from '../middlewares/paginationValidator.middleware';
import { ValidateFilterParamsMiddleware } from '../middlewares/validateFilterParams.middleware';
import { transactionsByFilter } from '../controllers/transactions/getTransactionsByFilter.controller';

const transactionRouter = Router();

transactionRouter.get('/all', authorizationMiddleware, paginationMiddleware, allTransactions);

transactionRouter.get(
	'/transaction-filter',
	authorizationMiddleware,
	paginationMiddleware,
	ValidateFilterParamsMiddleware,
	transactionsByFilter
);

transactionRouter.post(
	'/outflows',
	authorizationMiddleware,
	validateOutflowMiddleware,
	registerOutflow
);
transactionRouter.post(
	'/electronic-income',
	authorizationMiddleware,
	electronicIncomeMiddleware,
	registerElectronicIncome
);
transactionRouter.post(
	'/cash-income',
	authorizationMiddleware,
	inCashIncomeMiddleware,
	registerIncashIncome
);

export { transactionRouter };
