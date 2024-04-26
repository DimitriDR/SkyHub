import {Router} from "express";
import express from 'express';
import {createFlight, deleteFlight, getFlightById, getFlights, updateFight} from '../controllers/flights-controller';

const router: Router = express.Router();
router.get('/', getFlights);
router.get('/:id', getFlightById);
router.post('/', createFlight);
router.put('/:id', updateFight);
router.delete('/:id', deleteFlight);

export default router;
