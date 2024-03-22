import { Request, Response } from 'express';

export async function getFlights(req : Request, res : Response) {
    res.send({
        flights: [
            {id: 1, flight: 'JFK flight'},
            {id: 2, flight: 'LGA flight'}
        ]
    });
}
