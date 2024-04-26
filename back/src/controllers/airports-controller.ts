import { Request, Response } from 'express';
import {add, deleteAirportFromDB, getAll, getById, getName, update} from "../repositories/airports-mongo-repositories";

export async function getAirports(req : Request, res : Response) {
    try {
        console.log('getAirports')
        return getAll(req, res);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteAirport(req: Request, res: Response) {
    console.log('deleteAirport')
    return deleteAirportFromDB(req, res);
}

export async function addAirport(req: Request, res: Response) {
    console.log('addAirport')
    return add(req, res);
}

export async function updateAirport(req: Request, res: Response) {
    console.log('updateAirport')
    return update(req, res);
}

export async function getAirportName(req: Request, res: Response) {
    console.log('updateAirport')
    return getName(req, res);
}

export async function getAirportById(req: Request, res: Response) {
    console.log('getAirportById')
    return getById(req, res);
}

export async function getAirportFlights(req: Request, res: Response) {
    console.log('getAirportById')
    // return get(req, res);
}