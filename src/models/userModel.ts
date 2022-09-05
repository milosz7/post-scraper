import { model, Schema, InferSchemaType } from 'mongoose';
import { validateEmail, validateUsername } from '../utils/helpers';
import mongoose from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, validate: validateEmail, unique: true },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
    validate: validateUsername,
    unique: true,
  },
  posts: [Schema.Types.ObjectId],
  following: { type: [{type: Schema.Types.ObjectId, ref: 'User'}]},
  followers: { type: [{type: Schema.Types.ObjectId, ref: 'User'}]},
  password: { type: String, required: true },
  profileDesc: { type: String, maxLength: 50 },
  avatar: { type: Schema.Types.Buffer },
});

type UserModel = InferSchemaType<typeof userSchema>;

const User = model<UserModel>('User', userSchema);

export default User;
