import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { createIncashIncome } from '../../services/inCashIncomes.service';

export const registerIncashIncome = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// @ts-ignore
		const { userId } = req.user.payload;
		const { id } = await createIncashIncome(req.body, userId);
		res.status(201).json({ id });
	} catch (error) {
		errorCatcher(error, next);
	}
};
