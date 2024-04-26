//TODO interaction avec la base de données

import {Request, Response} from "express";
import Flight from "../models/flights";
import {QueryOptions, Schema} from "mongoose";
import {ObjectId} from "mongodb";
import Airport from "../models/airports";
import Flights from "../models/flights";

/**
 * Récupère tous les aéroports
 * @param {Request} req L'objet de la requête envoyé par le client
 * @param {Response} res L'objet de la réponse renvoyé par le serveur
 */
export async function getAll(req: Request, res: Response) {
    console.log('getAllAirports');
    //TODO valider date 2024-12-31 par exemple
    let queryFilters = getFlightsFilter(req);
    console.log('queryFilters', queryFilters);

    const options : QueryOptions = {};
    // si pas de filtres et que page et limit sont présents, on pagine
    if (Object.keys(queryFilters).length === 0 && req.query.page && req.query.limit) {
        let page: number = parseInt(req.query.page as string, 10);
        let limit: number = parseInt(req.query.limit as string, 10);

        page = isNaN(page) || page < 1 ? 1 : page;
        limit = isNaN(limit) || limit < 1 ? 10 : limit;

        const skip: number = (page - 1) * limit;
        options.limit = limit;
        options.skip = skip;
    }

    Flight.find(queryFilters, null, options).then((flights) => {
        res.send(flights);
    }).catch((error) => {
        res.status(500).send(error);  // Properly handle errors with a status code
    });
}

function getFlightsFilter(req : Request) {
    const queryFilters: any = {};
    if (req.query.id) {
        queryFilters._id = new ObjectId(req.query.id as string);
    }
    if (req.query.carrier) {
        queryFilters.carrier = req.query.carrier as string;
    }
    if (req.query.origin_id) {
        queryFilters.origin_id = req.query.origin_id as string;
    }
    if (req.query.destination_id) {
        queryFilters.destination_id = req.query.destination_id as string;
    }

    if (req.query.date) {
        queryFilters.date = {
            $gte: new Date(req.query.date as string),
            $lt: new Date(new Date(req.query.date as string).setHours(23, 59, 59, 999))
        }
    }
    return queryFilters;
}

export function add(req: Request, res: Response) {
    console.log(req.body)
    let {carrier, origin_id, destination_id, date} = req.body;

    if (!carrier || !origin_id || !destination_id || !date) {
        res.status(400).json({message: "Requête invalide, il manque des paramètres obligatoires."});
        return;
    }
    console.log(date)
    let d = new Date(date)
    console.log(d)
    let newFlight = new Flight({
        carrier: carrier,
        origin_id: origin_id,
        destination_id: destination_id,
        date: date
    });

    console.log('add flight : ', newFlight);

    newFlight.save()
        .then(savedFlight => {
            res.status(201).json(savedFlight);
        })
        .catch(error => {
            res.status(400).json({message: "Requête invalide. Erreur retournée par le serveur : " + error.message});
        });
}

export function update(req: Request, res: Response) {
    const id = req.params.id;
    const flight = req.body;

    Flight.findByIdAndUpdate(id, flight, {new: true})
        .then(updatedFlight => {
            res.json(updatedFlight);
        })
        .catch(error => {
            res.status(400).json({message: "Requête invalide. Erreur retournée par le serveur : " + error.message});
        });
}

export function deleteFlightFromDB(req: Request, res: Response) {
    const id = req.params.id;
    Flight.findByIdAndDelete(id)
        .then(() => {
            res.status(204).send();
        })
        .catch(error => {
            res.status(400).json({message: "Requête invalide. Erreur retournée par le serveur : " + error.message});
        });
}

/**
 * Récupère les informations sur un vol par son identifiant
 * @param {Request} req L'objet de la requête envoyé par le client
 * @param {Response} res L'objet de la réponse renvoyé par le serveur
 *
 * @route GET /flights/{id}
 *
 * @returns {Object} 200 - L'aéroport trouvé
 * @returns {Object} 500 - Erreur retournée par le serveur
 *
 * @throws {Error} 500 - Erreur retournée par le serveur
 */
export function getById(req: Request, res: Response): void {
    const {id} = req.params;

    Flight.findById(id)
        .then(airport => {
            if (!airport) {
                return res.status(404).json({message: "Vol non trouvé."});
            }
            res.status(200).json(airport);
        })
        .catch(error => {
            res.status(500).json({message: error.message});
        });
}