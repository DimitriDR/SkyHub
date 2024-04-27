import { Request, Response } from 'express';
import {getAll, add, update, deleteFlightFromDB, getById} from "../repositories/flights-mongo-repositories";

export function getFlights(req : Request, res : Response) {
    try {
        console.log('getFlights');
        return getAll(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}

export function getFlightById(req : Request, res : Response) {
    try {
        console.log('getFlightsById');
        return getById(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}

export function createFlight(req : Request, res : Response) {
    try {
        console.log('createFlight');
        return add(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}

export function updateFight(req : Request, res : Response) {
    try {
        console.log('updateFlight');
        return update(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}

export function deleteFlight(req : Request, res : Response) {
    try {
        console.log('deleteFlight');
        return deleteFlightFromDB(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}