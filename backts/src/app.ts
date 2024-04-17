import express, {Express} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './index'; // Assuming index.ts exports the routes
dotenv.config()

const app: Express = express();
// On va chercher le port dans les variables d'environnement, sinon notre application écoute sur le port 4000
const PORT: number = Number(process.env.PORT) || 4000;

async function startServer() {
    try {
        await mongoose.connect(String(process.env.DB_CONNECTION)).then(() => {
            console.log('Connected to MongoDB');
        }).catch((error) => {
            console.error(`Error connecting to MongoDB: ${error}`);
        });
        // middleware - before routes
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));

        // routes
        app.use('/api', routes);
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

startServer().catch(e => console.error(`Error starting server: ${e}`));
