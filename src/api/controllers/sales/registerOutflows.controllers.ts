import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { createOutflow } from '../../services/outflows.service';

export const registerOutflows = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// @ts-ignore
		const { userId } = req.user.payload;
		const { id } = await createOutflow(req.body, userId);
		res.status(201).json({ id });
	} catch (error) {
		errorCatcher(error, next);
	}
};
