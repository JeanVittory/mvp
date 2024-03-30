import { NextFunction } from 'express';
import { ApiError } from '../../config/errors/apiError.config';

export const errorCatcher = (error: any, next: NextFunction) => {
	if (error instanceof ApiError) return next(error);
	return next(ApiError.Internal(`Unknown Error: ${error}`));
};
