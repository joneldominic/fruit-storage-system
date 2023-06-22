import mongoose, { Schema, Types } from 'mongoose';

interface IFruit {
  id: Types.ObjectId;
  name: string | null;
  description: string | null;
}

export const FruitSchema = new Schema<IFruit>({
  id: { type: Schema.Types.ObjectId },
  name: { type: String, index: { unique: true } },
  description: { type: String }
});

FruitSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_: any, ret: any) {
    ret.id = ret._id; // eslint-disable-line no-param-reassign
    delete ret._id; // eslint-disable-line no-param-reassign
  }
});

export const Fruit = mongoose.model('Fruit', FruitSchema);
Fruit.createIndexes();
