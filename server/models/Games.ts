import mongoose, { Schema, Document } from 'mongoose';

export interface IGames extends Document {
    teamAId: String,
    teamBId: String,
    startTime: Date,
    winnerTeamId: String,
    finalScoreTeamA: String,
    finalScoreTeamB: String,
    startDate: Date
}

const GamesSchema: Schema = new Schema({
    teamAId: { type: String, required: true },
    teamBId: { type: String, required: true },
    startTime: { type: Date},
    startDate: { type: Date },
    winnerTeamId: { type: String},
    finalScoreTeamA: { type: String},
    finalScoreTeamB: { type: String },
});

export default mongoose.model<IGames>('Games', GamesSchema);