import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errors/apiError.config';
import { authorizationSchema } from '../validators/authorization.validators';
import { verifyJWT } from '../utils/verifyJwtToken.utils';
import { JsonWebTokenError } from 'jsonwebtoken';
import { getSessionById } from '../services/sessions/sessions.service';
import { signJwtToken } from '../utils/signJwtToken.utils';
import { REFRESH_TOKEN_EXP_TIME } from '../constants';
import { getUserByEmail } from '../services/users/user.service';

export const authorizationMiddleware = async (
	req: Request,
	_res: Response,
	next: NextFunction
): Promise<void> => {
	if (!req.headers.authorization) return next(ApiError.Forbbiden());
	if (!req.headers['x-refresh-token']) return next(ApiError.Forbbiden());
	const ACCESS_TOKEN = req.headers.authorization.split(' ')[1] as string;
	const REFRESH_TOKEN = req.headers['x-refresh-token'];
	const { error: isValidAccessToken } = authorizationSchema.validate(ACCESS_TOKEN);
	const { error: isValidRefreshToken } = authorizationSchema.validate(REFRESH_TOKEN);
	if (isValidAccessToken || isValidRefreshToken) return next(ApiError.Unauthorized());
	try {
		const { expired, payload } = verifyJWT(ACCESS_TOKEN);
		if (payload) {
			//@ts-ignore
			req.user = payload;
			return next();
		}
		const { payload: refresh } =
			expired && REFRESH_TOKEN ? verifyJWT(REFRESH_TOKEN as string) : { payload: null };
		if (!refresh) {
			return next(ApiError.Unauthorized());
		}
		const session = await getSessionById(refresh.sessionId);
		if (!session) {
			return next(ApiError.Unauthorized());
		}
		const { id, userEmail, userName } = await getUserByEmail(session.email);
		const newAccessTokenPayload = {
			userEmail,
			userName,
			sessionId: session.id,
			userId: id,
		};
		const newAccessToken = signJwtToken(newAccessTokenPayload, REFRESH_TOKEN_EXP_TIME);
		//@ts-ignore
		req.user = verifyJWT(newAccessToken).payload;
		req.headers.authorization = `Bearer ${newAccessToken}`;
		return next();
	} catch (error) {
		if (error instanceof JsonWebTokenError) return next(ApiError.Unauthorized());
		return next(ApiError.Internal('Something went wrong with the token.'));
	}
};
