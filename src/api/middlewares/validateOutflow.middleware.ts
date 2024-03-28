import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errors/apiError.config';
import * as errorCode from '../../config/errors/errorCodes.config.json';
import { outflowSchema } from '../validators/outflow.validators';

export const validateOutflowMiddleware = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const { error } = outflowSchema.validate(req.body);
		if (error)
			return ApiError.BadRequest(
				`${errorCode.sale.REGISTER_SALE_INVALID.CODE}:${errorCode.sale.REGISTER_SALE_INVALID.MESSAGE}`
			);
		next();
	} catch (error) {
		return next(ApiError.Internal('Unknown Error'));
	}
};
