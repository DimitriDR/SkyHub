import {Request, Response} from "express";

import Airport from "../models/airports";

export async function getAll(req: Request, res: Response) {
    // console.log('getAllAirports');
    // Airport.find().then((airports) => {
    //     res.send(airports);
    // }).catch((error) => {
    //     res.send(error);
    // });
    console.log('getAllAirports');
    let page = parseInt(req.query.page as string, 10);
    let limit = parseInt(req.query.limit as string, 10);

    page = isNaN(page) || page < 1 ? 1 : page;
    limit = isNaN(limit) || limit < 1 ? 10 : limit;

    const skip = (page - 1) * limit;

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
 * Génère un identifiant aléatoire pour un aéroport pour garder la même structure que les données extraites du dataset.
 */
function randomNumberId() {
    return Math.floor(Math.random() * (99999999 - 100000 + 1)) + 100000;
}

// Exemple d'utilisation :
// POST /airports - Ajouter un aéroport
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
            res.status(400).json({message: error.message});
        });
};

/**
 * Met à jour un aéroport
 * @param req
 * @param res
 */
export function update(req: Request, res: Response) {
    const {id} = req.params;
    Airport.findOneAndUpdate({airport_id: id}, req.body, {new: true})
        .then(updatedAirport => {
            if (!updatedAirport) {
                return res.status(404).json({message: "Airport not found."});
            }
            res.status(200).json(updatedAirport);
        })
        .catch(error => {
            res.status(400).json({message: error.message});
        });
};


export function deleteAirportFromDB(req: Request, res: Response) {
    const {id} = req.params;
    console.log('deleteAirportFromDB ', id);
    Airport.findOneAndDelete({airport_id: id})
        .then(airport => {
            if (!airport) {
                return res.status(404).json({message: "Airport not found."});
            }
            res.status(200).json({message: "Airport successfully deleted."});
        })
        .catch(error => {
            res.status(500).json({message: error.message});
        });
};

// GET /airports/:id - Information sur un aéroport
export function getById(req: Request, res: Response) {
    const {id} = req.params;
    Airport.findById(id)
        .then(airport => {
            if (!airport) {
                return res.status(404).json({message: "Airport not found."});
            }
            res.status(200).json(airport);
        })
        .catch(error => {
            res.status(500).json({message: error.message});
        });
};

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

