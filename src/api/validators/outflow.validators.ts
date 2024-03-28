import Joi from 'joi';
import { EGRESO, OUTCOME } from '../constants/index';

export const outflowSchema = Joi.object({
	description: Joi.string().required(),
	totalAmount: Joi.number().required(),
	movementType: Joi.object({
		id: Joi.string().required(),
		name: Joi.string().required().valid(EGRESO, OUTCOME),
	}),
});
