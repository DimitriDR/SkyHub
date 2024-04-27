import Joi from 'joi';

export const airportRequestSchema = Joi.object({
    name: Joi.string().required().min(1).required(),
    city: Joi.string().required().min(1).required(),
    state: Joi.string().required().min(1).required()
});
