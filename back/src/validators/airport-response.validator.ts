import Joi from 'joi';

// Define a Joi schema for the API response validation
export const airportSchema = Joi.object({
    _id: Joi.number().integer().required(),
    city: Joi.string().min(2).required(),
    state: Joi.string().min(2).required(), // assuming state codes are two letters
    name: Joi.string().min(2).required()
});

export const airportResponseSchema = Joi.array().items(airportSchema).required();


