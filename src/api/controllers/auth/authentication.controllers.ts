import { NextFunction, Request, Response } from 'express';
import { authenticationService } from '../../services/authentication.service';
import { errorCatcher } from '../../utils/errorCatcher.utils';

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
		errorCatcher(error, next);
	}
};
