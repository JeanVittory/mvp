import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errors/apiError.config';
import { authorizationSchema } from '../validators/authorization.validators';
import { verifyJWT } from '../utils/verifyJwtToken.utils';
import { JsonWebTokenError } from 'jsonwebtoken';

export const authorizationMiddleware = async (
	req: Request,
	_res: Response,
	next: NextFunction
): Promise<void> => {
const { ACCESS_TOKEN, REFRESH_TOKEN } = req.cookies;
	if(!ACCESS_TOKEN || !REFRESH_TOKEN) return next(ApiError.Forbbiden());
	const { error: isValidAccessToken } = authorizationSchema.validate(ACCESS_TOKEN);
	const { error: isValidRefreshToken } = authorizationSchema.validate(REFRESH_TOKEN);
	if (isValidAccessToken || isValidRefreshToken) return next(ApiError.Unauthorized());
	try {
		const { payload } = verifyJWT(ACCESS_TOKEN);
		if (payload) {
			//@ts-ignore
			req.user = payload;
			return next();
		}
	} catch (error) {
		if (error instanceof JsonWebTokenError) return next(ApiError.Unauthorized());
		return next(ApiError.Internal('Something went wrong with the token.'));
	}
};
