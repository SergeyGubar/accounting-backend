import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    ownerId: Schema.Types.ObjectId,
    title: String,
  },
);

export interface Category extends Document {
  ownerId: string;
  title: string;
}
