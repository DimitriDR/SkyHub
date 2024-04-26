// Importez les modules nécessaires
import mongoose, { Document, Schema } from 'mongoose';

// Définissez une interface TypeScript pour le type de données
interface IAirport extends Document {
    _id: number; // compliant with mongoDB way to handle id (par défaut il doit avoir un _id pour garantir l'unicité)
    city: string;
    state: string;
    name: string;
}


// Créez un schéma Mongoose en utilisant l'interface
const AirportSchema: Schema = new Schema({
    _id: {type: Number, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    name: {type: String, required: true}
}, { versionKey: false });

// Créez le modèle Mongoose en utilisant le schéma
export const Airport = mongoose.model<IAirport>('airports', AirportSchema, 'airports');

export default Airport;

