export async function getAirports(req : any, res : any) {
    console.log('getAirports');
    res.send({
        flights: [
            {id: 1, flight: 'JFK airport'},
            {id: 2, flight: 'LGA airport'}
        ]
    });
}
