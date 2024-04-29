import {Request, Response} from "express";

import Airport from "../models/airports";
import {QueryOptions} from "mongoose";
import {validateSchema} from "../middlewares/validator";

/**
 * Récupère tous les aéroports
 * @param {Request} req L'objet de la requête envoyé par le client
 * @param {Response} res L'objet de la réponse renvoyé par le serveur
 */
export async function getAll(req: Request, res: Response) {
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

    // lean -> retourne un objet javascript simple sans les ajouts de mongoose
    Airport.find(queryFilters, null, options).lean().then((airports) => {
        // let a = { //Pour tester la validation
        //     ddd : "test"
        // }
        const validate = validateSchema('airportResponse', airports);
        if (validate.error) {
            console.log(validate.error);
            return res.status(500).send({message : "Une erreur est survenue."});
        } else {
            res.status(200).send(airports);
        }
    }).catch((error) => {
        console.error(error);
        res.status(500).send({message : "Une erreur inattendue est survenue."});
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

    Airport.findById(id).lean()
        .then(airport => {
            if (!airport) {
                res.status(404).json({message: "Aéroport non trouvé."});
            } else {
                const validate = validateSchema('singleAirportResponse', airport);
                if (validate.error) {
                    console.log(validate.error);
                    return res.status(500).send({message: "Une erreur est survenue."});
                } else {
                    res.status(200).json(airport);
                }
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({message: "Une erreur est survenue."});
        });
}


/**
 * Ajoute un aéroport
 * @param {Request} req L'objet de la requête
 * @param {Response} res L'objet de la réponse
 *
 * @route POST /airports
 *
 * @returns {Object} 201 - L'aéroport ajouté
 * @returns {Object} 409 - La ressource existe déjà
 *
 * @throws {Error} 500 - Erreur non géré par le serveur
 */
export function add(req: Request, res: Response) {
    // console.log(req)
    const newAirport = new Airport(req.body);

    Airport.exists({
        name: newAirport.name,
        city: newAirport.city,
        state: newAirport.state}
    ).then((exists) => {
        if (exists) {
            res.status(409).json({message: "L'aéroport existe déjà."});
        } else {
            newAirport.save()
                .then(savedAirport => {
                    res.status(201).json(savedAirport);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({message: "Une erreur inattendue est survenue."});
                });
        }
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

    Airport.findOneAndUpdate({_id: id}, req.body, {new: true}).lean()
        .then(updatedAirport => {
            if (!updatedAirport) {
                res.status(404).json({message: "Aéroport non trouvé."});
            } else {
                const validate = validateSchema('singleAirportResponse', updatedAirport);
                if (validate.error) {
                    console.error(validate.error);
                    res.status(500).json({message: "Une erreur est survenue."});
                } else {
                    console.log(updatedAirport)
                    res.status(200).json(updatedAirport);
                }
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({message: "Requête invalide."});
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
                res.status(404).json({message: "Aéroport non trouvé."});
            } else {
                console.log('fin ', airport);
                res.status(204).send();
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({message: "Une erreur est survenue."});
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
                res.status(404).json({message: "Aéroport non trouvé."});
            } else {
                res.status(200).json({name : airport.name});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({message: "Une erreur est survenue."});
        });
}