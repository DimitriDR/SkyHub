import {Router} from "express";

const express = require('express');
const router : Router = express.Router();
import {getAirports} from '../controllers/airports-controller';

router.get('/', getAirports);

module.exports = router;