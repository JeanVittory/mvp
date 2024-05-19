import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errors/apiError.config';
import { IAuthentication } from '../interfaces/auth.interfaces';
import { authenticationSchema } from '../validators/authentication.validators';
import * as errorCode from '../../config/errors/errorCodes.config.json';

export const authenticationMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction
): void => {
	const { email, password }: IAuthentication = req.body;
	if (!email || !password)
		return next(
			ApiError.BadRequest(
				`${errorCode.authentication.INVALID_INFORMATION.CODE}: ${errorCode.authentication.INVALID_INFORMATION.MESSAGE}`
			)
		);
	const { error } = authenticationSchema.validate({ email, password });
	if (error)
		return next(
			ApiError.BadRequest(
				`${errorCode.authentication.INVALID_INFORMATION.CODE}: ${errorCode.authentication.INVALID_INFORMATION.MESSAGE}`
			)
		);
	next();
};
