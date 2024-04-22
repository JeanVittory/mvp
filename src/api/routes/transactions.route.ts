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

/**
 * @openapi
 * /api/transaction/all:
 *   get:
 *     tags:
 *       - transactions
 *     summary: Get all transactions by user.
 *     description: This endpoint allows to retrieve all the transactions availables following his userId.
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination.
 *         required: false
 *         schema:
 *           type: string
 *           default: "1"
 *       - name: pageSize
 *         in: query
 *         description: Number of items per page.
 *         required: false
 *         schema:
 *           type: string
 *           default: "10"
 *     responses:
 *       '200':
 *         description: Succesfully response.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 oneOf:
 *                   - $ref: "#/components/schemas/Schema1"
 *                   - $ref: "#/components/schemas/Schema2"
 *                   - $ref: "#/components/schemas/Schema3"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Unknown error.
 */

// TO DO:
// El /all recibe un array de objetos y se deben construir los esquemas para completar la documentacion del endpoint
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
