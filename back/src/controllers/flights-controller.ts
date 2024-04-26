import { Request, Response } from 'express';
import {getAll, add, update, deleteFlightFromDB, getById} from "../repositories/flights-mongo-repositories";

export async function getFlights(req : Request, res : Response) {
    console.log('getFlights');
    return getAll(req, res);
}

export async function getFlightById(req : Request, res : Response) {
    console.log('getFlightsById');
    return getById(req, res);
}

export async function createFlight(req : Request, res : Response) {
    console.log('createFlight');
    return add(req, res);
}

export async function updateFight(req : Request, res : Response) {
    console.log('updateFlight');
    return update(req, res);
}

export async function deleteFlight(req : Request, res : Response) {
    console.log('deleteFlight');
    return deleteFlightFromDB(req, res);
}