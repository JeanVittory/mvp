import Joi from 'joi';
import {
	DEBIT,
	DEBITO,
	ELECTRONIC_PAYMENT,
	INGRESO_ELECTRONICO,
	TRANSFERENCE,
	TRANSFERENCIA,
} from '../constants/index';

export const electronicIncomeSchema = Joi.object({
	totalAmount: Joi.number().required(),
	debitNote: Joi.number().required(),
	financialEntity: Joi.object({
		id: Joi.string().required(),
		name: Joi.string().required(),
	}).required(),
	movementType: Joi.object({
		id: Joi.string().required(),
		name: Joi.string().required().valid(ELECTRONIC_PAYMENT, INGRESO_ELECTRONICO),
	}).required(),
	operationType: Joi.object({
		id: Joi.string().required(),
		name: Joi.string().required().valid(TRANSFERENCE, TRANSFERENCIA, DEBIT, DEBITO),
	}).required(),
});
