import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { CategorySchema, CategoryT } from './category.schema';

export const TransactionSchema = new mongoose.Schema({
  accountId: Types.ObjectId,
  amount: Number,
  message: String,
  createdAt: { type: Date, default: Date.now },
  category: CategorySchema,
});

export interface Transaction extends Document {
  accountId: string;
  amount: number;
  message?: string;
  category: CategoryT;
  createdAt?: Date;
}

export type TransactionT = Omit<Transaction, keyof Document>;
