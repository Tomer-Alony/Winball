import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import {IBet} from "./Bet";

interface IPlayer extends Document  {
    playerId: mongoose.Types.ObjectId
    points: number,
    bullseye: number,
    side: number,
    games: number,
}

export interface IGroup extends Document {
    leaguesIds: ObjectId[];
    manager_id: String;
    name: String;
    description: String;
    players: IPlayer[];
    userBets: IBet[]
}

const GroupSchema: Schema = new Schema({
    leaguesIds: { type: [Object] },
    name: { type: String, required: true, unique: true },
    manager_id: { type: String, required: true },
    description: { type: String },
    players: { type: [Object]},
    userBets: { type: [Object] },
});

export default mongoose.model<IGroup>('Groups', GroupSchema);