import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const RecordSchema = new mongoose.Schema({
  accountId: String,
  amount: Number,
});

export interface Record extends Document {
  accountId: string;
  amount: number;
}
