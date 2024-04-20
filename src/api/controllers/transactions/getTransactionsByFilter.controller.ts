import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { getElectronicIncomesFiltered } from '../../services/electronicIncomes.service';
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
} from '../../constants';
import { getInCashIncomesFiltered } from '../../services/inCashIncomes.service';
import { paginationFormater } from '../../utils/paginationFormater.utils';
import { getOutflowsFiltered } from '../../services/outflows.service';
import { mergeAndSortObjects } from '../../utils/mergeAndSortObjects.utils';

export const transactionsByFilter = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// @ts-ignore
		const { userId } = req.user.payload;
		const page = (req.query.page as string) || DEFAULT_PAGINATION_PAGE;
		const pageSize = (req.query.pageSize as string) || DEFAULT_PAGINATION_PAGE_SIZE;

		const { startDate, endDate, operationType, finantialEntity, amount, movementType } = req.body;

		const { page: pageFormatted, pageSize: pageSizeFormatted } = paginationFormater(page, pageSize);
		let response: any = [];

		if (!operationType && !finantialEntity && !movementType && (startDate || endDate || amount)) {
			const [electronicIncomes, inCashIncomes, outflows] = await Promise.all([
				getElectronicIncomesFiltered(userId, pageFormatted, pageSizeFormatted, req.body),
				getInCashIncomesFiltered(userId, pageFormatted, pageSizeFormatted, req.body),
				getOutflowsFiltered(userId, pageFormatted, pageSizeFormatted, req.body),
			]);
			const mergedAndSortedTransactions = mergeAndSortObjects(
				electronicIncomes,
				inCashIncomes,
				outflows
			);
			res.status(OK).json(mergedAndSortedTransactions);
		}
		if (
			operationType ||
			finantialEntity ||
			movementType.includes(INGRESO_ELECTRONICO) ||
			movementType.includes(ELECTRONIC_PAYMENT)
		) {
			const result = await getElectronicIncomesFiltered(userId, +page, +pageSize, req.body);
			const mergedAndSortedTransactions = mergeAndSortObjects(result);
			response = [...response, ...mergedAndSortedTransactions];
		}

		if (movementType.includes(EGRESO) || movementType.includes(OUTCOME)) {
			const result = await getOutflowsFiltered(userId, +page, +pageSize, req.body);
			const mergedAndSortedTransactions = mergeAndSortObjects(result);

			response = [...response, ...mergedAndSortedTransactions];
		}

		if (movementType.includes(INGRESO_EFECTIVO) || movementType.includes(CASH_PAYMENT)) {
			const result = await getInCashIncomesFiltered(userId, +page, +pageSize, req.body);
			const mergedAndSortedTransactions = mergeAndSortObjects(result);

			response = [...response, ...mergedAndSortedTransactions];
		}

		res.status(OK).json(response);
	} catch (error) {
		errorCatcher(error, next);
	}
};
