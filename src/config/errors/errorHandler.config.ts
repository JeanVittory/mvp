import { Request, Response, NextFunction } from 'express';
import { ApiError } from './apiError.config';

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
	if (error instanceof ApiError) {
		res.status(error.status).send(error.message);
	} else {
		console.log(error);
		res.status(500).send(`Internal Server Error: ${error}`);
	}
};
