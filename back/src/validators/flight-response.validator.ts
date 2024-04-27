import Joi from 'joi';

export const flightResponseSchema = Joi.object({
    _id: Joi.string().required(),
    carrier: Joi.string().required(),
    origin_id: Joi.number().required(),
    destination_id: Joi.number().required(),
    date: Joi.date().required()
});



