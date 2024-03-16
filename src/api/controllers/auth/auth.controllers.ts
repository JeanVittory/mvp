import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../../config/errors/apiError.config';
import { authenticationService } from '../../services/authentication.service';

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const response = await authenticationService(email, password);
		res.status(200).json(response);
	} catch (error) {
		if (error instanceof ApiError) return next(error);
		return next(ApiError.Internal('Unknown Error'));
	}
};
