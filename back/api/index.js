const express = require('express');
const users = require('./routes/flights');
const router = express.Router();

module.exports = () => {
  router.use('/flights',users());
  router.use('/airports',users());

  return router;
};