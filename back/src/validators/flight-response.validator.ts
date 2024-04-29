import Joi from 'joi';

export const singleFlightSchema = Joi.object({
    _id: Joi.object().required(),
    carrier: Joi.string().min(1).required(),
    origin_id: Joi.number().min(1).required(),
    destination_id: Joi.number().min(1).required(),
    date: Joi.date().required()
});

export const flightResponseSchema = Joi.array().items(singleFlightSchema).required();




