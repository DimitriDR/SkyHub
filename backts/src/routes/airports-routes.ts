import {Router} from "express";
import express from 'express';
import {addAirport, deleteAirport, getAirportById, getAirports} from '../controllers/airports-controller';

const router: Router = express.Router();
router.get('/', getAirports);
router.delete('/:id', deleteAirport);
router.post('/', addAirport);
router.put('/:id', getAirportById);
router.put('/:id/flights', getAirportById);

export default router;
