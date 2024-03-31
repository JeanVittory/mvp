import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { createElectronicIncome } from '../../services/electronicIncomes.service';
import { CREATED } from '../../constants';

export const registerElectronicIncome = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		// @ts-ignore
		const { userId } = req.user.payload;
		const { id } = await createElectronicIncome(req.body, userId);
		res.status(CREATED).json({ id });
	} catch (error) {
		errorCatcher(error, next);
	}
};
