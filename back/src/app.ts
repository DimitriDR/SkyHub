import express, {Express} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './index'; // Assuming index.ts exports the routes
dotenv.config()

const app: Express = express();

//-----------
// CONSTANTES
//-----------
// Port d'écoute de notre serveur, inutile de le changer car l'utilisateur aura, in fine, la main par le conteneur
const PORT: number = 4000;

// On doit nécessairement demander à l'utilisateur de renseigner le nom du conteneur de la BD pour pouvoir se connecter
// Par ce biais, on va utiliser le Magic DNS de Docker pour avoir la bonne adresse IP
const DB_HOSTNAME: string = String(process.env.DB_HOSTNAME)

// Constantes qui ne bougent pas, car aucun intérêt pour l'utilisateur de les changer.
const DB_PORT: number = 27017;
const DB_DATABASE_NAME: string = "skyhub"

// URL de connexion à la BD
const DB_CONNECTION: string = `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE_NAME}`;

//-----------
async function startServer() {
    try {
        await mongoose.connect(DB_CONNECTION).then(() => {
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
