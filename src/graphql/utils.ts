import { Fruit } from '../models/Fruit';
import { FruitStorage } from '../models/FruitStorage';

export interface IFindParams {
  filter: object;
  isExpected?: boolean;
  toJson?: boolean;
}

export const findFruit = async (args: IFindParams) => {
  const fruit = await Fruit.findOne(args.filter);

  if (!fruit && args.isExpected) {
    throw new Error('Fruit not found!');
  }

  if (fruit && !args.isExpected) {
    throw new Error(`${fruit.name} already exists.`);
  }

  if (args.toJson) {
    return fruit?.toJSON();
  }

  return fruit;
};

export const findFruitStorage = async (args: IFindParams) => {
  const fruitStorage = await FruitStorage.findOne(args.filter);

  if (!fruitStorage && args.isExpected) {
    throw new Error('Fruit Storage not found!');
  }

  if (args.toJson) {
    return fruitStorage?.toJSON();
  }

  return fruitStorage;
};
