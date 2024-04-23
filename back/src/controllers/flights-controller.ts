import { Request, Response } from 'express';
import {getAll} from "../repositories/flights-mongo-repositories";

export async function getFlights(req : Request, res : Response) {
    console.log('getFlights');
    return getAll(req, res);
}
