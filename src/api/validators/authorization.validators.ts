import Joi from 'joi';

export const authorizationSchema = Joi.string().required();
