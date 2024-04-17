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
            console.log('[INFO] Connecté à MongoDB !');
        }).catch((error) => {
            console.error(`[ERREUR] Erreur lors de la connexion à la MongoDB : ${error}`);
        });
        // middleware - before routes
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));

        // Routes
        app.use('/api', routes);

        // Démarrage du serveur
        const server = app.listen(PORT, (): void => {
            console.log(`[INFO] Le serveur tourne sur le port ${PORT}`);
        });

        process.on('SIGINT', () => {
            console.log(`[INFO] Merci d'avoir évalué l'API SkyHub. L'application se termine…`);

            server.close(() => {
                mongoose.disconnect().then(() => {
                    console.log(`[INFO] Déconnecté de MongoDB !`);
                    console.log(`[INFO] Application terminée.`);
                    process.exit(0);
                });
            });
        });
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

startServer().catch(e => console.error(`Error starting server: ${e}`));
