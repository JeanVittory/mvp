import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { getElectronicIncomesByUserId } from '../../services/electronicIncomes.service';
import { getIncashIncomesByUserId } from '../../services/inCashIncomes.service';
import { getOutflowsByUserId } from '../../services/outflows.service';
import { mergeAndSortObjects } from '../../utils/mergeAndSortObjects.utils';
import { OK } from '../../constants';

export const allTransactions = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// @ts-ignore
		const { userId } = req.user.payload;
		const [electronicIncomes, inCashIncomes, outflows] = await Promise.all([
			getElectronicIncomesByUserId(userId),
			getIncashIncomesByUserId(userId),
			getOutflowsByUserId(userId),
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
