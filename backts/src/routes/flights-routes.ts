import {Router} from "express";
import express from 'express';
import {getFlights} from '../controllers/flights-controller';

const router: Router = express.Router();
router.get('/', getFlights);

export default router;
