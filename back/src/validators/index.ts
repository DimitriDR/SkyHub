import {ArraySchema, ObjectSchema} from 'joi';
import {airportRequestSchema} from './airport-request.validator';
import {flightResponseSchema, singleFlightSchema} from './flight-response.validator';
import {flightRequestSchema} from "./flight-resquest.validator";
import {airportResponseSchema, singleAirportSchema} from "./airport-response.validator";

export type ValidatorSchemaString = "airportRequestBody" | "flightResponse" | "airportResponse" | "flightRequestBody"
    | "singleAirportResponse" | "singleFlightResponse";

export type ValidatorIndex = {
    [K in ValidatorSchemaString]: ObjectSchema<any> | ArraySchema<any>;
};

const Validators: ValidatorIndex = {
    airportRequestBody: airportRequestSchema,
    flightResponse: flightResponseSchema,
    flightRequestBody: flightRequestSchema,
    airportResponse: airportResponseSchema,
    singleAirportResponse : singleAirportSchema,
    singleFlightResponse : singleFlightSchema
};

export default Validators;
