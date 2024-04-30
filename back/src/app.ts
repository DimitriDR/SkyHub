import express, {Application, Express, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import YAML from 'js-yaml';
import fs from 'fs';
import routes from './index';
import swaggerUi from 'swagger-ui-express';
import {SwaggerOptions} from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc"; // Assuming index.ts exports the routes
dotenv.config()

const app: Express = express();

//-----------
// CONSTANTES
//-----------
// Port d'écoute de notre serveur, inutile de le changer car l'utilisateur aura, in fine, la main par le conteneur
const PORT: number = 4000;

// On doit nécessairement demander à l'utilisateur de renseigner le nom du conteneur de la BD pour pouvoir se connecter
// Par ce biais, on va utiliser le Magic DNS de Docker pour avoir la bonne adresse IP
const DB_HOSTNAME: string = "localhost"

// Constantes qui ne bougent pas, car aucun intérêt pour l'utilisateur de les changer.
const DB_PORT: number = 27017;
const DB_DATABASE_NAME: string = "skyhub"

// URL de connexion à la BD
const DB_CONNECTION: string = `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE_NAME}`;

function initializeOpenApi(app: Application) {
    const openAPISpecs = YAML.load(fs.readFileSync("../docs/skyhub.yaml", "utf-8"));

    const options: SwaggerOptions = {
        swaggerDefinition: openAPISpecs,
        apis: ["./src/routes/*.ts"]
    }

    const swaggerSpec = swaggerJSDoc(options);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

//-----------
async function startServer() {
    try {
        await mongoose.connect(DB_CONNECTION).then(() => {
            console.log('[INFO] Connecté à MongoDB !');
        }).catch((error) => {
            console.error(`[ERREUR] Erreur lors de la connexion à la MongoDB : ${error}`);
        });
        // middlewares - before routes
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));

        // Routes
        initializeOpenApi(app);
        app.use('/api', routes);

        // Gère toute URL incorrecte : Not Found
        app.use((req : Request, res : Response, next: NextFunction) => {
            res.status(404).send({message : 'L\'URL demandée n\'existe pas.'});
        });

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
