import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { createElectronicIncome } from '../../services/electronicIncomes.service';

export const registerElectronicIncome = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// @ts-ignore
		const { userId } = req.user.payload;
		const { id } = await createElectronicIncome(req.body, userId);
		res.status(201).json({ id });
	} catch (error) {
		errorCatcher(error, next);
	}
};
