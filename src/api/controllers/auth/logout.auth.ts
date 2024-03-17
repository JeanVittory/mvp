import { NextFunction, Request, Response } from 'express';
import { deleteSession } from '../../services/sessions.service';
import { ApiError } from '../../../config/errors/apiError.config';

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		//@ts-ignore
		const { payload } = req.user;
		const response = await deleteSession(payload.id);
		if (!response) throw ApiError.Unauthorized();
		res.status(200).json(response);
	} catch (error) {
		if (error instanceof ApiError) return next(error);
		return next(ApiError.Internal('Unknown Error'));
	}
};
