import {Router} from "express";

const express = require('express');
const router : Router = express.Router();
import {getFlights} from '../controllers/flights-controller';

router.get('/', getFlights);

module.exports = router;