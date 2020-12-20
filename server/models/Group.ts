import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
    leaguesIds: String[];
    usersIds: String[];
    manager_id: String;
    name: String;
    description: String;
}

const GroupSchema: Schema = new Schema({
    leaguesIds: { type: [String] },
    name: { type: String, required: true, unique: true },
    manager_id: { type: String, required: true },
    description: { type: String },
    usersIds: { type: [String] }
});

export default mongoose.model<IGroup>('Groups', GroupSchema);