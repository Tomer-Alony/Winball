import mongoose, { Schema, Document, ObjectId } from 'mongoose';

interface IPlayer {
    points: number,
    bullseye: number,
    side: number,
    games: number,
    playerId: mongoose.Types.ObjectId
}

export interface IGroup extends Document {
    leaguesIds: ObjectId[];
    players: IPlayer[];
    manager_id: String;
    name: String;
    description: String;
}

const GroupSchema: Schema = new Schema({
    leaguesIds: { type: [Object] },
    name: { type: String, required: true, unique: true },
    manager_id: { type: String, required: true },
    description: { type: String },
    players: { type: [Object]}
});

export default mongoose.model<IGroup>('Groups', GroupSchema);