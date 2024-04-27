// validators/index.ts
import {ArraySchema, ObjectSchema} from 'joi';
import { airportRequestSchema } from './airport-request.validator';
import { flightResponseSchema } from './flight-response.validator';
import {flightRequestSchema} from "./flight-resquest.validator";
import {airportResponseSchema} from "./airport-response.validator";

export type ValidatorSchemaString = "airportRequestBody" | "flightResponse" | "airportResponse" | "flightRequestBody";


// validators/types.ts

// Correct way to define mapped type for ValidatorIndex
export type ValidatorIndex = {
    [K in ValidatorSchemaString]: ObjectSchema<any> | ArraySchema<any>;
};

const Validators: ValidatorIndex = {
    airportRequestBody: airportRequestSchema,
    flightResponse: flightResponseSchema,
    flightRequestBody: flightRequestSchema,
    airportResponse: airportResponseSchema
};

export default Validators;
