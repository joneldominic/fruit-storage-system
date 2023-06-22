import mongoose, { Schema, Types } from 'mongoose';

interface IFruitStorage {
  id: Types.ObjectId;
  fruitId: Types.ObjectId;
  limit: number | null;
  count: number | null;
}

export const FruitStorageSchema = new Schema<IFruitStorage>({
  id: { type: Schema.Types.ObjectId },
  fruitId: { type: Schema.Types.ObjectId },
  limit: { type: Number },
  count: { type: Number }
});

FruitStorageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_: any, ret: any) {
    ret.id = ret._id; // eslint-disable-line no-param-reassign
    delete ret._id; // eslint-disable-line no-param-reassign
  }
});

export const FruitStorage = mongoose.model('FruitStorage', FruitStorageSchema);
