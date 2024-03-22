import express, { Router } from 'express';
import flightsRouter from './routes/flights-routes';
import airportsRouter from './routes/airports-routes';

const router: Router = express.Router();

router.use('/flights', flightsRouter);
router.use('/airports', airportsRouter);

export default router;
