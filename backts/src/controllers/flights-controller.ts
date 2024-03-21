export async function getFlights(req : any, res : any) {
    res.send({
        flights: [
            {id: 1, flight: 'JFK flight'},
            {id: 2, flight: 'LGA flight'}
        ]
    });
}
