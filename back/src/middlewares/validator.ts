import Validators, {ValidatorSchemaString} from '../validators';
import {NextFunction} from "express";
import {Request, Response} from "express";
import Joi from "joi";

export function validate(validator: ValidatorSchemaString) {
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator does not exist`);

    return async function(req: Request, res: Response, next: NextFunction) {
        console.log('validate '+validator, req.body);
        try {
            await Validators[validator].validateAsync(req.body);
            next();
        } catch (err: any) {
            if (err.isJoi) { // 422 - Unprocessable Entity
                res.status(422).json({
                    message: "Les données fournies ne sont pas valides.",
                });
            } else {
                res.status(500).json({
                    message: "Une erreur est survenue."
                });
            }
            next(err)
        }
    };
}

export function validateSchema(validator: ValidatorSchemaString, data: any) : Joi.ValidationResult {
    console.log('validateSchema', validator, data);
    return Validators[validator].validate(data);
}
