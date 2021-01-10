import mongoose, { Schema, Document } from 'mongoose';

export interface ILeague extends Document {
    image: String;
    name: String;
    displayName: String;
}

const LeaguesSchema: Schema = new Schema({
    name: { type: String, unique: true },
    displayName: { type: String, required: true, unique: true },
    image: { type: String }
});

export default mongoose.model<ILeague>('Leagues', LeaguesSchema);