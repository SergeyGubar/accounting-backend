import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  },
);

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}
