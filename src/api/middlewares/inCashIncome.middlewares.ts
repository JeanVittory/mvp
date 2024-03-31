import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errors/apiError.config';
import * as errorCode from '../../config/errors/errorCodes.config.json';
import { inCashIncomeSchema } from '../validators/inCashIncome.validators';

export const inCashIncomeMiddleware = async (
	req: Request,
	_res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { error } = inCashIncomeSchema.validate(req.body);
		if (error)
			next(
				ApiError.BadRequest(
					`${errorCode.sale.INVALID_CASH_SALE.CODE}:${errorCode.sale.INVALID_CASH_SALE.MESSAGE}`
				)
			);
		next();
	} catch (error) {
		next(ApiError.Internal(`Unknown Error: ${error}`));
	}
};
