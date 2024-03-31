import Joi from 'joi';

export const paginationSchema = Joi.object({
	page: Joi.string().required(),
	pageSize: Joi.string().required(),
});
