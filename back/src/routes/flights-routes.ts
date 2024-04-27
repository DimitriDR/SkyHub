import {Router} from "express";
import express from 'express';
import {createFlight, deleteFlight, getFlightById, getFlights, updateFight} from '../controllers/flights-controller';
import {validate} from "../middlewares/validator";

const router: Router = express.Router();

router.get('/', getFlights);
router.get('/:id', getFlightById);

router.post('/', validate('flightRequestBody'), createFlight);

router.put('/:id', validate('flightRequestBody'), updateFight);

router.delete('/:id', deleteFlight);

export default router;
