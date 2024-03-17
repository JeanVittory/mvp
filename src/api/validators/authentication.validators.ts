import Joi from 'joi';

export const authenticationSchema = Joi.object({
	email: Joi.string()
		.required()
		.regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
	password: Joi.string().required().max(16),
});
