import { Request, Response } from 'express';
import {getAll, add} from "../repositories/flights-mongo-repositories";

export async function getFlights(req : Request, res : Response) {
    console.log('getFlights');
    return getAll(req, res);
}

export async function createFlight(req : Request, res : Response) {
    console.log('createFlight');
    return add(req, res);
}
