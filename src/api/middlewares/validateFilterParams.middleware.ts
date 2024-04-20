import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errors/apiError.config';
import * as errorCode from '../../config/errors/errorCodes.config.json';
import { transactionFilterSchema } from '../validators/transactionsFilter.validators';

export const ValidateFilterParamsMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction
): void => {
	try {
		const { startDate, endDate, operationType, finantialEntity, amount, movementType } = req.query;
		let movementTypeFormated: string[] = [];
		let finantialEntityFormated: string[] = [];
		let operationTypeFormated: string[] = [];

		if (!startDate && !endDate && !operationType && !finantialEntity && !amount && !movementType) {
			return next(
				ApiError.BadRequest(
					`${errorCode.filters.INVALID_FILTER_REQUEST.CODE}: ${errorCode.filters.INVALID_FILTER_REQUEST.MESSAGE}`
				)
			);
		}

		if (amount && isNaN(+amount)) {
			return next(
				ApiError.BadRequest(
					`${errorCode.filters.INVALID_PARAMETER.CODE}: ${errorCode.filters.INVALID_PARAMETER.MESSAGE}`
				)
			);
		}

		if (movementType && !(typeof movementType === 'string')) {
			return next(
				ApiError.BadRequest(
					`${errorCode.filters.INVALID_PARAMETER.CODE}: ${errorCode.filters.INVALID_PARAMETER.MESSAGE}`
				)
			);
		}
		if (movementType) movementTypeFormated = movementType.split(',');

		if (finantialEntity && !(typeof finantialEntity === 'string')) {
			return next(
				ApiError.BadRequest(
					`${errorCode.filters.INVALID_PARAMETER.CODE}: ${errorCode.filters.INVALID_PARAMETER.MESSAGE}`
				)
			);
		}
		if (finantialEntity) finantialEntityFormated = finantialEntity.split(',');

		if (operationType && !(typeof operationType === 'string')) {
			return next(
				ApiError.BadRequest(
					`${errorCode.filters.INVALID_PARAMETER.CODE}: ${errorCode.filters.INVALID_PARAMETER.MESSAGE}`
				)
			);
		}
		if (operationType) operationTypeFormated = operationType.split(',');

		const filterQuery = {
			...(startDate && { startDate }),
			...(endDate && { endDate }),
			...(operationTypeFormated.length && { operationType: operationTypeFormated }),
			...(finantialEntityFormated.length && { finantialEntity: finantialEntityFormated }),
			...(amount && { amount }),
			...(movementTypeFormated.length && { movementType: movementTypeFormated }),
		};
		const { error } = transactionFilterSchema.validate(filterQuery);
		if (error) {
			return next(
				ApiError.BadRequest(
					`${errorCode.filters.INVALID_PARAMETER.CODE}: ${errorCode.filters.INVALID_PARAMETER.MESSAGE}`
				)
			);
		}
		req.body = filterQuery;
		next();
	} catch (error) {
		next(ApiError.Internal(`Unknown Error: ${error}`));
	}
};
