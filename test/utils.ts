import { Fruit } from '../src/models/Fruit';
import { FruitStorage } from '../src/models/FruitStorage';

interface ISeedDataParams {
  name: string;
  description: string;
  limit: number;
  count?: number;
}

// eslint-disable-next-line import/prefer-default-export
export const seedData = async (data: ISeedDataParams) => {
  const fruit = new Fruit({
    name: data.name,
    description: data.description
  });
  const savedFruit = (await fruit.save()).toJSON();

  const fruitStorage = new FruitStorage({
    fruitId: savedFruit.id,
    limit: data.limit,
    count: data.count || 0
  });

  await fruitStorage.save();
};

// TODO: Remove
