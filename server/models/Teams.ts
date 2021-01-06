import mongoose, { Schema, Document } from 'mongoose';

export interface ITeams extends Document {
    name: String,
    leagueId: String,
    picPath: String
}

const TeamsSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  leagueId: { type: String, required: true },
  picPath: {type: String, required: true}
});

export default mongoose.model<ITeams>('Teams', TeamsSchema);