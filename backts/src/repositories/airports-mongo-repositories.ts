import {Request, Response} from "express";

import Airport from "../models/airports";

/**
 * Récupère tous les aéroports
 * @param {Request} req L'objet de la requête envoyé par le client
 * @param {Response} res L'objet de la réponse renvoyé par le serveur
 */
export async function getAll(req: Request, res: Response) {
    // console.log('getAllAirports');
    // Airport.find().then((airports) => {
    //     res.send(airports);
    // }).catch((error) => {
    //     res.send(error);
    // });
    console.log('getAllAirports');

    let page: number = parseInt(req.query.page as string, 10);
    let limit: number = parseInt(req.query.limit as string, 10);

    page = isNaN(page) || page < 1 ? 1 : page;
    limit = isNaN(limit) || limit < 1 ? 10 : limit;

    const skip: number = (page - 1) * limit;

    Airport.find().limit(limit).skip(skip).then((airports) => {
        res.send(airports);
    }).catch((error) => {
        res.send(error);
    });

}

export async function getOne(req: Request, res: Response) {
    const {id} = req.params;

    Airport.findOne({airport_id: id}).then((airport) => {
        res.send(airport);
    }).catch((error) => {
            res.send(error);
        }
    );
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

    newAirport.airport_id = randomNumberId();

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

    Airport.findOneAndUpdate({airport_id: id}, req.body, {new: true})
        .then(updatedAirport => {
            if (!updatedAirport) {
                return res.status(404).json({message: "Aéroport non trouvé."});
            }
            res.status(200).json(updatedAirport);
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
    Airport.findOneAndDelete({airport_id: id})
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

// GET /airports/:id/flights - Récupérer tous les vols pour un aéroport
// Vous devrez implémenter le modèle et la logique pour récupérer les vols liés à un aéroport.
export function getFlightsForAirport(req: Request, res: Response) {
    const {id} = req.params;
    // La logique pour récupérer les vols liés à l'aéroport sera implémentée ici
};

// GET /airports/:id/flights?date= - Récupérer tous les vols d'un aéroport pour une date donnée
// Vous devrez implémenter le modèle et la logique pour récupérer les vols liés à un aéroport à une date spécifique.
export const getFlightsForAirportByDate = (req: Request, res: Response) => {
    const {id} = req.params;
    const {date} = req.query;
    //TODO faire une fonction qui prend juste un id aéroport et une date et qui retourne les vols
    //

    // La logique pour récupérer les vols liés à l'aéroport pour une date spécifique sera implémentée ici
};

