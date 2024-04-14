import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { getElectronicIncomesFiltered } from '../../services/electronicIncomes.service';
import { ELECTRONIC_PAYMENT, INGRESO_ELECTRONICO, OK } from '../../constants';
import { getInCashIncomesFiltered } from '../../services/inCashIncomes.service';
import { paginationFormater } from '../../utils/paginationFormater.utils';
import { getOutflowsFiltered } from '../../services/outflows.service';
import { mergeAndSortObjects } from '../../utils/mergeAndSortObjects.utils';

export const transactionsByFilter = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// @ts-ignore
		const { userId } = req.user.payload;
		const page = (req.query.page as string) || '1';
		const pageSize = (req.query.pageSize as string) || '10';

		const { startDate, endDate, operationType, finantialEntity, amount, movementType } = req.body;
		const { page: pageFormatted, pageSize: pageSizeFormatted } = paginationFormater(page, pageSize);
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
			movementType === INGRESO_ELECTRONICO ||
			movementType === ELECTRONIC_PAYMENT
		) {
			await getElectronicIncomesFiltered(userId, +page, +pageSize, req.body);
		}
	} catch (error) {
		errorCatcher(error, next);
	}
};
