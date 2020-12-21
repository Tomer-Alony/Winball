import mongoose, { Schema, Document } from 'mongoose';

export interface IGroupUser extends Document {
    score: number;
    groupId: String;
    userBets: [String] //TODO: Change to Bet Model
}

const GroupUserSchema: Schema = new Schema({
    score: { type: Number, required: true },
    groupId: { type: String, required: true },
    userBets: { type: [String] },
});

export default mongoose.model<IGroupUser>('GroupUser', GroupUserSchema);