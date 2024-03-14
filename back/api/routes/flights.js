var express = require('express');
var router = express.Router();

/* GET users listing. */
module.exports = () => {
    router.get('/', (req, res) => {
        res.send({
            flights : [
                {id: 1, flight: 'JFK flight'},
                {id: 2, flight: 'LGA flight'}
            ]
        });
    });

    return router;
};
