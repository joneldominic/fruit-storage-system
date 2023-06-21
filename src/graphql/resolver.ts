/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fruit } from '../models/Fruit';
import { FruitStorage } from '../models/FruitStorage';

interface IMutationRequestModel {
  name: string | undefined;
  amount: number | undefined;
  description: string | undefined;
  limit: number | undefined;
  forceDelete: boolean | undefined;
}

export const storeFruitToFruitStorageResolver = async (args: IMutationRequestModel) => {};

export const removeFruitFromFruitStorageResolver = (args: IMutationRequestModel) => {};

export const createFruitForFruitStorageResolver = async (args: IMutationRequestModel) => {
  // TODO: Validations
  /* 
    1. Limit description to 10 characters
    2. Fruit name should be unique
  */

  try {
    const fruit = new Fruit({
      name: args.name,
      description: args.description
    });
    const savedFruit = (await fruit.save()).toJSON();

    const fruitStorage = new FruitStorage({
      fruitId: savedFruit.id,
      limit: args.limit,
      count: 0
    });

    const savedFruitStorage = (await fruitStorage.save()).toJSON();

    return {
      ...savedFruitStorage,
      fruit: savedFruit
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const updateFruitForFruitStorageResolver = (args: IMutationRequestModel) => {};

export const deleteFruitFromFruitStorageResolver = (args: IMutationRequestModel) => {};
