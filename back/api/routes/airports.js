var express = require('express');
var router = express.Router();

/* GET users listing. */
module.exports = () => {
    router.get('/', (req, res) => {
        res.send({
            airports: [
                {id: 1, airport: 'JFK airport'},
                {id: 2, airport: 'LGA airport'}
            ]
        });
    });

    return router;
};
