import {Router} from "express";
import express from 'express';
import {
    addAirport,
    deleteAirport,
    getAirportById,
    getAirports,
    updateAirport
} from '../controllers/airports-controller';
import {getName} from "../repositories/airports-mongo-repositories";
import {validate} from "../middlewares/validator";

const router: Router = express.Router();

router.get('/', getAirports);
router.get('/:id', getAirportById);
router.get('/:id/name', getName);

router.post('/', validate('airportRequestBody'), addAirport);

router.put('/:id', validate('airportRequestBody'), updateAirport);

router.delete('/:id', deleteAirport);

export default router;
