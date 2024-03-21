const express = require('express');
const flights = require('./routes/flights');
const airports = require('./routes/airports');
const router = express.Router();

router.use('/flights', flights);
router.use('/airports', airports)
module.exports = router;