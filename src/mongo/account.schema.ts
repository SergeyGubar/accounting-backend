import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    ownerId: Schema.Types.ObjectId,
    title: String,
    currentAmount: Number,
  },
);

export interface Account extends Document {
  ownerId: string;
  title: string;
  currentAmount: number;
}