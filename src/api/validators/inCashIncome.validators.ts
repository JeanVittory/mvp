import Joi from 'joi';
import { CASH_PAYMENT, INGRESO_EFECTIVO } from '../constants/index';

export const inCashIncomeSchema = Joi.object({
	totalAmount: Joi.number().required(),
	debitNote: Joi.number().required(),
	movementType: Joi.object({
		id: Joi.string().required(),
		name: Joi.string().required().valid(CASH_PAYMENT, INGRESO_EFECTIVO),
	}).required(),
});
