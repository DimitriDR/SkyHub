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

const router: Router = express.Router();
router.get('/', getAirports);
router.get('/:id', getAirportById);
router.delete('/:id', deleteAirport);
router.post('/', addAirport);
router.put('/:id', updateAirport);
router.get('/:id/name', getName);

export default router;
