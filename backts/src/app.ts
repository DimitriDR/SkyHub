import express from 'express';
import dotenv from 'dotenv';
const mongoose = require('mongoose');
// import cookieParser from 'cookie-parser';
const routes = require('./index');
dotenv.config()

const app = express();
const PORT = Number(process.env.PORT) || 3000;

console.log(process.env.DB_CONNECTION)
console.log(process.env.PORT)

async function startServer() {
    try {
        mongoose.connect(process.env.DB_CONNECTION)
            .then(() => console.log('MongoDB Connected'))
            .catch((err: any) => console.log(err));

        // Define routes and middleware

        app.use('/api', routes);
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
    }
}

startServer()
