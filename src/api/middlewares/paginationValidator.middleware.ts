import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errors/apiError.config';
import * as errorCode from '../../config/errors/errorCodes.config.json';
import { paginationSchema } from '../validators/pagination.validators';

export const paginationMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
	try {
		const page = (req.query.page as string) || '1';
		const pageSize = (req.query.pageSize as string) || '10';
		if (!page || !pageSize)
			return next(
				ApiError.BadRequest(
					`${errorCode.pagination.INVALID_PAGINATION_REQUEST.CODE}: ${errorCode.pagination.INVALID_PAGINATION_REQUEST.MESSAGE}`
				)
			);
		const { error } = paginationSchema.validate({ page, pageSize });

		if (error) {
			return next(
				ApiError.BadRequest(
					`${errorCode.pagination.INVALID_PAGINATION_VALUES.CODE}: ${errorCode.pagination.INVALID_PAGINATION_VALUES.MESSAGE}`
				)
			);
		}
		next();
	} catch (error) {
		next(ApiError.Internal(`Unknown Error: ${error}`));
	}
};
