import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../../config/errors/apiError.config';
import { authenticationService } from '../../services/authentication.service';

export const authentication = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { email, password } = req.body;
		const tokens = await authenticationService(email, password);
		res.status(200).json(tokens);
	} catch (error) {
		if (error instanceof ApiError) return next(error);
		return next(ApiError.Internal('Unknown Error'));
	}
};
