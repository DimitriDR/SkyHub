import {Router} from "express";
import express from 'express';
import {createFlight, getFlights} from '../controllers/flights-controller';

const router: Router = express.Router();
router.get('/', getFlights);
router.post('/', createFlight);

export default router;
