import { Request, Response } from 'express';
import {add, deleteAirportFromDB, getAll, getById, getName, update} from "../repositories/airports-mongo-repositories";

export function getAirports(req : Request, res : Response) {
    try {
        console.log('getAirports')
        return getAll(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}

export function deleteAirport(req: Request, res: Response) {
    try {
        console.log('deleteAirport')
        return deleteAirportFromDB(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}

export function addAirport(req: Request, res: Response) {
    try {
        console.log('addAirport')
        return add(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}

export function updateAirport(req: Request, res: Response) {
    try {
        console.log('updateAirport')
        return update(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}

export function getAirportName(req: Request, res: Response) {
    try {
        console.log('getAirportName')
        return getName(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}

export function getAirportById(req: Request, res: Response) {
    try {
        console.log('getAirportById')
        return getById(req, res);
    } catch (e) {
        res.status(500).send("Une erreur est survenue.");
    }
}