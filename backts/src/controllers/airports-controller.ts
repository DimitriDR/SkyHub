import { Request, Response } from 'express';

export async function getAirports(req : Request, res : Response) {
    console.log('getAirports');
    res.send({
        flights: [
            {id: 1, flight: 'JFK airport'},
            {id: 2, flight: 'LGA airport'}
        ]
    });
}
