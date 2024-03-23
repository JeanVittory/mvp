import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';

export const registerSoldProduct = (_req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).json('Hola mundo');
	} catch (error) {
		errorCatcher(error, next);
	}
};
