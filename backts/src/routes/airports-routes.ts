import {Router} from "express";
import express from 'express';
import {getAirports} from '../controllers/airports-controller';

const router: Router = express.Router();
router.get('/', getAirports);
export default router;
