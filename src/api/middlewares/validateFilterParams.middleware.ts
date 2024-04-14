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

		if (movementType) {
			// to be continued...
			// Los campos movementType, OpType y finantialEntity son selecciones multiples
			// se deben formatear a tipo array
			// continuar con el filtrado y hacer pruebas
		}

		const filterQuery = {
			...(startDate && { startDate }),
			...(endDate && { endDate }),
			...(operationType && { operationType }),
			...(finantialEntity && { finantialEntity }),
			...(amount && { amount }),
			...(movementType && { movementType }),
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
