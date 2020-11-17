import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    googleId: String;
}

const UserSchema: Schema = new Schema({
  googleId: { type: String, required: true, unique: true },
});

export default mongoose.model<IUser>('users', UserSchema);