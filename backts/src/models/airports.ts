// Importez les modules nécessaires
import mongoose, { Document, Schema } from 'mongoose';

// Définissez une interface TypeScript pour le type de données
interface IAirport extends Document {
    airport_id: number;
    city: string;
    state: string;
    name: string;
}



// Créez un schéma Mongoose en utilisant l'interface
const AirportSchema: Schema = new Schema({
    airport_id: { type: Number, required: false, unique: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    name: { type: String, required: true }
});


// Créez le modèle Mongoose en utilisant le schéma
const Airport = mongoose.model<IAirport>('airports', AirportSchema, 'airports');

export default Airport;

