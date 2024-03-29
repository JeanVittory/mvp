import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';

export const registerElectronicIncome = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		// @ts-ignore
		const { userId } = req.user.payload;
	} catch (error) {
		errorCatcher(error, next);
	}
};
