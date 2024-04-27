import {Router} from "express";
import express from 'express';
import {
    addAirport,
    deleteAirport,
    getAirportById, getAirportName,
    getAirports,
    updateAirport
} from '../controllers/airports-controller';
import {validate} from "../middlewares/validator";

const router: Router = express.Router();

router.get('/', getAirports);
router.get('/:id', getAirportById);
router.get('/:id/name', getAirportName);

router.post('/', validate('airportRequestBody'), addAirport);

router.put('/:id', validate('airportRequestBody'), updateAirport);

router.delete('/:id', deleteAirport);

export default router;
