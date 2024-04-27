import Joi from 'joi';

export const flightRequestSchema = Joi.object({
    carrier: Joi.string().required(),
    origin_id: Joi.number().required(),
    destination_id: Joi.number().required(),
    date: Joi.date().required()
});