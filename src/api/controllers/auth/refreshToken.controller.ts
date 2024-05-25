import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { refreshTokenService } from '../../services/authentication/authentication.service';
import { ACCESS_TOKEN_EXP_COOKIE_TIME, OK_WITH_NO_RESPONSE } from '../../constants';

export const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { REFRESH_TOKEN } = req.cookies;
		const { ACCESS_TOKEN } = await refreshTokenService(REFRESH_TOKEN);
		res.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
			maxAge: ACCESS_TOKEN_EXP_COOKIE_TIME,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});
		res.status(OK_WITH_NO_RESPONSE).json();
	} catch (error) {
		errorCatcher(error, next);
	}
};
