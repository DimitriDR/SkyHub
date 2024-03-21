import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const routes = require('./index');

dotenv.config()

const app = express();
const PORT = Number(process.env.PORT) || 4000;

async function startServer() {
    try {
        mongoose.connect(String(process.env.DB_CONNECTION))
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
