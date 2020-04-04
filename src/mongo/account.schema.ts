import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    ownerId: String,
    title: String,
    currentAmount: Number,
  },
);

export interface Account extends Document {
    ownerId: string;
    title: string;
    currentAmount: number;
}
