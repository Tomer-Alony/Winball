import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    googleId: String;
    picture: String;
    displayName: String
}

const UserSchema: Schema = new Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  picture: { type: String, required: true },
});

export default mongoose.model<IUser>('Users', UserSchema);