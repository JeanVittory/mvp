import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errors/apiError.config';
import { verifyJWT } from '../utils/verifyJwtToken.utils';

export const refreshTokenMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
	const { REFRESH_TOKEN } = req.cookies;
	if (!REFRESH_TOKEN) return next(ApiError.Unauthorized());
	const { payload } = verifyJWT(REFRESH_TOKEN as string);
	if (!payload) {
		return next(ApiError.Unauthorized());
	}
	next();
};
