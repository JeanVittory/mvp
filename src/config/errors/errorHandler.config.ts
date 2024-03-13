import { Request, Response, NextFunction } from 'express';
import { ApiError } from './apiError.config';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof ApiError) {
		res.status(err.status).send(err.message);
	} else {
		res.status(500).send('Internal Server Error');
	}
};
