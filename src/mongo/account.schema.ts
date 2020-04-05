import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

export type Currency = 'UAH' | 'EUR' | 'USD';
export type AccountType = 'card' | 'cash';

export const AccountSchema = new mongoose.Schema({
    ownerId: Types.ObjectId,
    title: String,
    currentAmount: Number,
    type: String,
  },
);

export interface Account extends Document {
  ownerId: string;
  title: string;
  currentAmount: number;
  type: AccountType;
  currency: Currency;
}

export type AccountT = Omit<Account, keyof Document>;
