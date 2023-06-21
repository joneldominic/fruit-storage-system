import mongoose, { Schema, Types } from 'mongoose';

interface IFruit {
  id: Types.ObjectId;
  name: string | null;
  description: string | null;
}

export const FruitSchema = new Schema<IFruit>({
  id: { type: Schema.Types.ObjectId },
  name: { type: String },
  description: { type: String }
});

FruitSchema.index({ name: 1 });

export const Fruit = mongoose.model('Fruit', FruitSchema);
