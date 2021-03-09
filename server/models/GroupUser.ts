import mongoose, { Schema, Document } from 'mongoose';
import {IBets} from "./Bets";

export interface IGroupUser extends Document {
    score: number;
    groupId: String;
    playerId: String,
    userBets: IBets[]
}

const GroupUserSchema: Schema = new Schema({
    score: { type: Number, required: true },
    playerId: { type: String, required: true },
    groupId: { type: String, required: true },
    userBets: { type: [Object] },
});

export default mongoose.model<IGroupUser>('GroupUser', GroupUserSchema);