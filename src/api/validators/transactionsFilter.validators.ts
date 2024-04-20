import Joi from 'joi';
import {
	ELECTRONIC_PAYMENT,
	INGRESO_ELECTRONICO,
	OUTCOME,
	EGRESO,
	CASH_PAYMENT,
	INGRESO_EFECTIVO,
	TRANSFERENCE,
	TRANSFERENCIA,
	DEBITO,
	DEBIT,
	NEQUI,
	BANCOLOMBIA,
	DAVIPLATA,
} from '../constants';

export const transactionFilterSchema = Joi.object({
	startDate: Joi.date(),
	endDate: Joi.date(),
	operationType: Joi.array().items(Joi.string().valid(TRANSFERENCE, TRANSFERENCIA, DEBITO, DEBIT)),
	finantialEntity: Joi.array().items(Joi.string().valid(NEQUI, BANCOLOMBIA, DAVIPLATA)),
	amount: Joi.number(),
	movementType: Joi.array().items(
		Joi.string().valid(
			ELECTRONIC_PAYMENT,
			INGRESO_ELECTRONICO,
			OUTCOME,
			EGRESO,
			CASH_PAYMENT,
			INGRESO_EFECTIVO
		)
	),
});
