import { Request, Response } from 'express';
import {getAll, add, update, deleteFlightFromDB, getById} from "../repositories/flights-mongo-repositories";
import {Flight} from "../models/flights";
import Airport from "../models/airports";

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

async function checkAirportExists(req : Request) {
    let newFlight = new Flight(req.body);
    let airportOk = true;
    await Airport.exists({
        _id: newFlight.origin_id
    }).then((exists) => {
        if (!exists) {
            airportOk = false;
        }
    });

    await Airport.exists({
        _id: newFlight.destination_id
    }).then((exists) => {
        if (!exists) {
            airportOk = false;
        }
    });

    console.log('Airport ids exist ? ', airportOk);
    return airportOk;
}

export async function createFlight(req: Request, res: Response) {
    try {
        console.log('createFlight');
        const airportOk: boolean = await checkAirportExists(req);
        if (!airportOk) {
            return res.status(404).json({message: "L'aéroport de départ ou d'arrivée est invalide."});
        }
        return add(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}

export async function updateFight(req : Request, res : Response) {
    try {
        console.log('updateFlight');
        const airportOk: boolean = await checkAirportExists(req);
        if (!airportOk) {
            return res.status(404).json({message: "L'aéroport de départ ou d'arrivée est invalide."});
        }
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