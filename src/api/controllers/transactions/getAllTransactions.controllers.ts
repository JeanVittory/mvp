import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { getElectronicIncomesByUserId } from '../../services/transactions/electronicIncomes.service';
import { getIncashIncomesByUserId } from '../../services/transactions/inCashIncomes.service';
import { getOutflowsByUserId } from '../../services/transactions/outflows.service';
import { mergeAndSortObjects } from '../../utils/mergeAndSortObjects.utils';
import { DEFAULT_PAGINATION_PAGE, DEFAULT_PAGINATION_PAGE_SIZE, OK } from '../../constants';
import { paginationFormater } from '../../utils/paginationFormater.utils';

export const allTransactions = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// @ts-ignore
		const { userId } = req.user.payload;
		const page = (req.query.page as string) || DEFAULT_PAGINATION_PAGE;
		const pageSize = (req.query.pageSize as string) || DEFAULT_PAGINATION_PAGE_SIZE;
		const { page: pageFormatted, pageSize: pageSizeFormatted } = paginationFormater(page, pageSize);
		const [electronicIncomes, inCashIncomes, outflows] = await Promise.all([
			getElectronicIncomesByUserId(userId, pageFormatted, pageSizeFormatted),
			getIncashIncomesByUserId(userId, pageFormatted, pageSizeFormatted),
			getOutflowsByUserId(userId, pageFormatted, pageSizeFormatted),
		]);
		const mergedAndSortedTransactions = mergeAndSortObjects(
			electronicIncomes,
			inCashIncomes,
			outflows
		);
		res.status(OK).json(mergedAndSortedTransactions);
	} catch (error) {
		errorCatcher(error, next);
	}
};
