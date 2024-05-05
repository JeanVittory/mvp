import { NextFunction, Request, Response } from 'express';
import { deleteSessionById } from '../../services/sessions/sessions.service';
import { ApiError } from '../../../config/errors/apiError.config';
import { errorCatcher } from '../../utils/errorCatcher.utils';
import { OK } from '../../constants';

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		//@ts-ignore
		const { payload } = req.user;
		const response = await deleteSessionById(payload.id);
		if (!response) throw ApiError.Unauthorized();
		res.status(OK).json(response);
	} catch (error) {
		errorCatcher(error, next);
	}
};
