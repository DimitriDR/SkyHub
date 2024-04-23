//TODO interaction avec la base de données

import {Request, Response} from "express";
import Flight from "../models/flights";
import {QueryOptions} from "mongoose";
import {ObjectId} from "mongodb";

/**
 * Récupère tous les aéroports
 * @param {Request} req L'objet de la requête envoyé par le client
 * @param {Response} res L'objet de la réponse renvoyé par le serveur
 */
export async function getAll(req: Request, res: Response) {
    console.log('getAllAirports');

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
