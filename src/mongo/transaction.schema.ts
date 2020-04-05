import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  accountId: Types.ObjectId,
  categoryId: Types.ObjectId,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});

export interface Transaction extends Document {
  accountId: string;
  amount: number;
  categoryId: string;
}

export type TransactionT = Omit<Transaction, keyof Document>;
