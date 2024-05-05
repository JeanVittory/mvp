import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { getElectronicIncomesIdslistFiltered } from '../../services/transactions/electronicIncomes.service';
import {
	CASH_PAYMENT,
	INGRESO_EFECTIVO,
	EGRESO,
	OUTCOME,
	ELECTRONIC_PAYMENT,
	INGRESO_ELECTRONICO,
	OK,
	DEFAULT_PAGINATION_PAGE,
	DEFAULT_PAGINATION_PAGE_SIZE,
	X_TOTAL_COUNT,
} from '../../constants';
import { getInCashIncomesIdsListFiltered } from '../../services/transactions/inCashIncomes.service';
import { paginationFormater } from '../../utils/paginationFormater.utils';
import { getOutflowsIdsListFiltered } from '../../services/transactions/outflows.service';
//import { mergeAndSortObjects } from '../../utils/mergeAndSortObjects.utils';
import { getTransactionsFiltered } from '../../services/transactions/allTransactions.service';
//import { calculateRemainingRecordsTotal } from '../../utils/calculateRemainingRecordsTotal.utils';

export const transactionsByFilter = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// @ts-ignore
		const { userId } = req.user.payload;
		const page = (req.query.page as string) || DEFAULT_PAGINATION_PAGE;
		const pageSize = (req.query.pageSize as string) || DEFAULT_PAGINATION_PAGE_SIZE;

		const { startDate, endDate, operationType, finantialEntity, amount, movementType } = req.body;

		const { page: pageFormatted, pageSize: pageSizeFormatted } = paginationFormater(page, pageSize);
		let response: any = [];
		let totalItemsRemaining: number = 0;

		if (!operationType && !finantialEntity && !movementType && (startDate || endDate || amount)) {
			const [electronicIncomes, inCashIncomes, outflows] = await Promise.all([
				getElectronicIncomesIdslistFiltered(userId, req.body),
				getInCashIncomesIdsListFiltered(userId, req.body),
				getOutflowsIdsListFiltered(userId, req.body),
			]);
			const listOfTransactionsIds = [...electronicIncomes, ...inCashIncomes, ...outflows];
			const { transactions, xTotalCount } = await getTransactionsFiltered(
				listOfTransactionsIds,
				pageFormatted,
				pageSizeFormatted
			);
			res.setHeader(X_TOTAL_COUNT, xTotalCount);
			res.status(OK).json(transactions);
		}
		if (
			operationType ||
			finantialEntity ||
			movementType?.includes(INGRESO_ELECTRONICO) ||
			movementType?.includes(ELECTRONIC_PAYMENT)
		) {
			console.log('ingrese aqui');
			const listOfTransactionsIds = await getElectronicIncomesIdslistFiltered(userId, req.body);
			const { transactions, xTotalCount } = await getTransactionsFiltered(
				listOfTransactionsIds,
				pageFormatted,
				pageSizeFormatted
			);
			console.log('🚀 ~ transactionsByFilter ~ transactions:', transactions);

			response = [...transactions];
			totalItemsRemaining += xTotalCount;
		}

		if (movementType?.includes(EGRESO) || movementType?.includes(OUTCOME)) {
			const listOfTransactionsIds = await getOutflowsIdsListFiltered(userId, req.body);
			const { transactions, xTotalCount } = await getTransactionsFiltered(
				listOfTransactionsIds,
				pageFormatted,
				pageSizeFormatted
			);
			response = [...transactions];
			totalItemsRemaining += xTotalCount;
		}

		if (movementType?.includes(INGRESO_EFECTIVO) || movementType?.includes(CASH_PAYMENT)) {
			const listOfTransactionsIds = await getInCashIncomesIdsListFiltered(userId, req.body);
			const { transactions, xTotalCount } = await getTransactionsFiltered(
				listOfTransactionsIds,
				pageFormatted,
				pageSizeFormatted
			);
			response = [...transactions];
			totalItemsRemaining += xTotalCount;
		}
		res.setHeader(X_TOTAL_COUNT, totalItemsRemaining);
		res.status(OK).json(response);
	} catch (error) {
		errorCatcher(error, next);
	}
};
