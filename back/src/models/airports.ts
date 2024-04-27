import mongoose, { Document, Schema } from 'mongoose';

interface IAirport extends Document {
    _id: number;
    city: string;
    state: string;
    name: string;
}

export const AirportSchema: Schema = new Schema({
    _id: {type: Number, required: true},// Ok avec la façon dont mongoDB gère les ids (par défaut, il doit avoir un _id pour garantir l'unicité)
    city: {type: String, required: true},
    state: {type: String, required: true},
    name: {type: String, required: true}
}, { versionKey: false });

// Middleware pour générer un id aléatoire afin de garder la même structure que les données extraites du jeu de données
AirportSchema.pre('validate', async function(next) {
    if (this.isNew && !this._id) {
        while (true) {
            const potentialId = Math.floor(Math.random() * (99999999 - 100000 + 1)) + 100000;
            const exists = await Airport.exists({_id: potentialId});
            if (!exists) {
                console.log('New airport id generated: ' + potentialId);
                this._id = potentialId;
                break;
            }
        }
    }
    next();
});

export const Airport = mongoose.model<IAirport>('airports', AirportSchema, 'airports');

export default Airport;

