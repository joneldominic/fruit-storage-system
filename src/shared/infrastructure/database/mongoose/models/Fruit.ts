import mongoose, { Schema, Types } from 'mongoose';

interface IFruit {
  id: Types.ObjectId;
  name: string | null;
  description: string | null;
}

const FruitSchema = new Schema<IFruit>({
  id: { type: Schema.Types.ObjectId },
  name: { type: String, index: { unique: true } },
  description: { type: String }
});

const Fruit = mongoose.model('Fruit', FruitSchema);
Fruit.createIndexes();

export default Fruit;
