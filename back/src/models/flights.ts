import mongoose, { Document, Schema } from 'mongoose';

export interface IFlight extends Document {
    carrier: string;
    origin_id: number;
    destination_id: number;
    date: Date;
}

const FlightSchema: Schema = new Schema({
    carrier: { type: String, required: true },
    origin_id: { type: Number, required: true },
    destination_id: { type: Number, required: true },
    date: { type: Date, required: true }
}, { versionKey: false });

export const Flight = mongoose.model<IFlight>('flights', FlightSchema, 'flights');
