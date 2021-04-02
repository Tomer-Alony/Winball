import mongoose, { Schema, Document } from 'mongoose';

export interface IBet extends Document {
    gameId: String,
    playerId: String,
    bet: String,
}

const BetSchema: Schema = new Schema({
    gameId: { type: String, required: true },
    playerId: { type: String, required: true },
    bet: { type: String, required: true },
});

export default mongoose.model<IBet>('Bet', BetSchema);