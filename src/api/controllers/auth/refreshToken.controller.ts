import { NextFunction, Request, Response } from 'express';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { refreshTokenService } from '../../services/authentication/authentication.service';
import { OK } from '../../constants';

export const refreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { REFRESH_TOKEN } = req.body;
		const ACCESS_TOKEN = await refreshTokenService(REFRESH_TOKEN);
		console.log('REVISAR ESTO!', ACCESS_TOKEN);
		res.status(OK).json(ACCESS_TOKEN);
	} catch (error) {
		errorCatcher(error, next);
	}
};
