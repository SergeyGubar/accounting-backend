import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    ownerId: Types.ObjectId,
    title: String,
  },
);

export interface Category extends Document {
  ownerId: string;
  title: string;
}

export type CategoryT = Omit<Category, keyof Document>;
