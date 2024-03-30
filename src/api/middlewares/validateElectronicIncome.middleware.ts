import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errors/apiError.config';
import * as errorCode from '../../config/errors/errorCodes.config.json';
import { electronicIncomeSchema } from '../validators/electronicIncome.validators';

export const validateElectronicIncome = async (
	req: Request,
	_res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { error } = electronicIncomeSchema.validate(req.body);
		if (error)
			next(
				ApiError.BadRequest(
					`${errorCode.sale.INVALID_ELECTRONIC_SALE.CODE}:${errorCode.sale.INVALID_ELECTRONIC_SALE.MESSAGE}`
				)
			);
		next();
	} catch (error) {
		console.log(error);
		next(ApiError.Internal(`Unknown Error: ${error}`));
	}
};
