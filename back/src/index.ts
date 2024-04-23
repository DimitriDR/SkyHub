import express, { Router } from 'express';
import flightsRouter from './routes/flights-routes';
import airportsRouter from './routes/airports-routes';

const router: Router = express.Router();

//main routes

router.use('/flights', flightsRouter);
router.use('/airports', airportsRouter);
//router.use('/flight', flightsRouter); //TODO voir comment gérer le singulier pour la clareté des endpoints
//router.use('/airport', airportsRouter);
export default router;
