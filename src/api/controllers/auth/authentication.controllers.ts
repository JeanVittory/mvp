import { NextFunction, Request, Response } from 'express';
import { authenticationService } from '../../services/authentication.service';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { OK } from '../../constants';

export const authentication = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { email, password } = req.body;
		const tokens = await authenticationService(email, password);
		res.status(OK).json(tokens);
	} catch (error) {
		errorCatcher(error, next);
	}
};
