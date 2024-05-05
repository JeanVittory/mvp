import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { createOutflow } from '../../services/transactions/outflows.service';
import { CREATED } from '../../constants';

export const registerOutflow = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		// @ts-ignore
		const { userId } = req.user.payload;
		const { id } = await createOutflow(req.body, userId);
		res.status(CREATED).json({ id });
	} catch (error) {
		errorCatcher(error, next);
	}
};
