import Joi from 'joi';
import {
	DEBIT,
	DEBITO,
	ELECTRONIC_PAYMENT,
	INGRESO_ELECTRONICO,
	TRANSFERENCE,
	TRANSFERENCIA,
	OUTCOME,
	EGRESO,
	CASH_PAYMENT,
	INGRESO_EFECTIVO,
} from '../constants';

export const transactionFilterSchema = Joi.object({
	startDate: Joi.date(),
	endDate: Joi.date(),
	operationType: Joi.array().valid(TRANSFERENCE, TRANSFERENCIA, DEBIT, DEBITO),
	finantialEntity: Joi.array(),
	amount: Joi.number(),
	movementType: Joi.array().valid(
		ELECTRONIC_PAYMENT,
		INGRESO_ELECTRONICO,
		OUTCOME,
		EGRESO,
		CASH_PAYMENT,
		INGRESO_EFECTIVO
	),
});
