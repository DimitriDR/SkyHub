import express from 'express';
import {MongoClient, MongoClientOptions} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const MONGODB_URI: string = String(process.env.DB_CONNECTION) || "mongodb://localhost:27017";

const client: MongoClient = new MongoClient(MONGODB_URI)

async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        // Define your routes and middleware here


        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
    }
}

startServer()
