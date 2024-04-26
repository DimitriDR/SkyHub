import {Request, Response} from "express";

import Airport from "../models/airports";
import {getAirports} from "../controllers/airports-controller";
import {QueryOptions} from "mongoose";
import airports from "../models/airports";

/**
 * Récupère tous les aéroports
 * @param {Request} req L'objet de la requête envoyé par le client
 * @param {Response} res L'objet de la réponse renvoyé par le serveur
 */
export async function getAll(req: Request, res: Response) {
    console.log('getAllAirports');

    let queryFilters = getAirportsFilters(req);
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

    Airport.find(queryFilters, null, options).then((airports) => {
        res.send(airports);
    }).catch((error) => {
        res.status(500).send(error);  // Properly handle errors with a status code
    });
}

function getAirportsFilters(req : Request) {
    const queryFilters: any = {};
    if (req.query.id) {
        queryFilters._id = parseInt(req.query.id as string, 10);
    }
    if (req.query.city) {
        queryFilters.city = req.query.city as string;
    }
    if (req.query.state) {
        queryFilters.state = req.query.state as string;
    }
    if (req.query.name) {
        queryFilters.name = req.query.name as string;
    }
    return queryFilters;
}


/**
 * Génère un identifiant aléatoire entre 100000 et 99999999 pour
 * un aéroport pour garder la même structure que les données extraites du jeu de données.
 * @returns {number} Un identifiant aléatoire
 */
function randomNumberId(): number {
    return Math.floor(Math.random() * (99999999 - 100000 + 1)) + 100000;
}

/**
 * Ajoute un aéroport
 * @param {Request} req L'objet de la requête
 * @param {Response} res L'objet de la réponse
 *
 * @route POST /airports
 *
 * @returns {Object} 201 - L'aéroport ajouté
 * @returns {Object} 400 - Requête invalide
 *
 * @throws {Error} 400 - Erreur retournée par le serveur
 */
export function add(req: Request, res: Response) {
    console.log(req.body)
    // console.log(req)
    const newAirport = new Airport(req.body);
    //TODO joi ne pas autoriser d'ID, gérer de notre côté + vérifier que id généré n'existe pas déjà

    newAirport._id = randomNumberId();

    console.log('addAirport ', newAirport);
    newAirport.save()
        .then(savedAirport => {
            res.status(201).json(savedAirport);
        })
        .catch(error => {
            res.status(400).json({message: "Requête invalide. Erreur retournée par le serveur : " + error.message});
        });
}

/**
 * Met à jour un aéroport
 * @param {Request} req L'objet de la requête
 * @param {Response} res L'objet de la réponse
 *
 * @route PUT /airports/{id}
 *
 * @returns {Object} 200 - L'aéroport mis à jour
 * @returns {Object} 404 - Aéroport non trouvé
 * @returns {Object} 400 - Requête invalide
 *
 * @throws {Error} 400 - Erreur retournée par le serveur
 * @throws {Error} 500 - Erreur retournée par le serveur
 */
export function update(req: Request, res: Response): void {
    const {id} = req.params;

    Airport.findOneAndUpdate({_id: id}, req.body, {new: true})
        .then(updatedAirport => {
            if (!updatedAirport) {
                return res.status(404).json({message: "Aéroport non trouvé."});
            }
            console.log(updatedAirport)
            res.status(201).json(updatedAirport);
        })
        .catch(error => {
            res.status(400).json({message: "Requête invalide. Erreur retournée par le serveur : " + error.message});
        });
}


/**
 * Supprime un aéroport de la base de données
 * @param {Request} req L'objet de la requête envoyé par le client
 * @param {Response }res L'objet de la réponse renvoyé par le serveur
 *
 * @route DELETE /airports/{id}
 *
 * @returns {Object} 200 - Aéroport supprimé avec succès
 * @returns {Object} 404 - Aéroport non trouvé
 * @returns {Object} 500 - Erreur retournée par le serveur
 *
 * @throws {Error} 404 - Erreur retournée par le serveur
 * @throws {Error} 500 - Erreur retournée par le serveur
 */
export function deleteAirportFromDB(req: Request, res: Response): void {
    const {id} = req.params;
    console.log('deleteAirportFromDB ', id);
    Airport.findOneAndDelete({_id: id})
        .then(airport => {
            if (!airport) {
                return res.status(404).json({message: "Aéroport non trouvé."});
            }
            res.status(200).json({message: "Aéroport supprimé avec succès."});
        })
        .catch(error => {
            res.status(500).json({message: "Erreur retournée par le serveur : " + error.message});
        });
}

/**
 * Récupère des informations sur un aéroport par son identifiant
 * @param {Request} req L'objet de la requête envoyé par le client
 * @param {Response} res L'objet de la réponse renvoyé par le serveur
 *
 * @route GET /airports/{id}
 *
 * @returns {Object} 200 - L'aéroport trouvé
 * @returns {Object} 500 - Erreur retournée par le serveur
 *
 * @throws {Error} 500 - Erreur retournée par le serveur
 */
export function getById(req: Request, res: Response): void {
    const {id} = req.params;

    Airport.findById(id)
        .then(airport => {
            if (!airport) {
                return res.status(404).json({message: "Aéroport non trouvé."});
            }
            res.status(200).json(airport);
        })
        .catch(error => {
            res.status(500).json({message: error.message});
        });
}

/**
 * Récupère le nom d'un aéroport par son identifiant
 * @param req
 * @param res
 */
export function getName(req : Request, res : Response) {
    const {id} = req.params;
    console.log('getName', id)
    Airport.findById(id)
        .then(airport => {
            if (!airport) {
                return res.status(404).json({message: "Aéroport non trouvé."});
            }
            res.status(200).json({name : airport.name});
        })
        .catch(error => {
            res.status(500).json({message: error.message});
        });
}