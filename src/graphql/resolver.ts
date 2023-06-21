/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable consistent-return */
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

export const storeFruitToFruitStorageResolver = async (args: IMutationRequestModel) => {
  try {
    const fruitFilter = { name: args.name };
    const fruit = await Fruit.findOne(fruitFilter);

    if (!fruit) {
      throw new Error('Fruit not found!');
    }

    const fruitStorageFilter = { fruitId: fruit._id };
    const fruitStorage = await FruitStorage.findOne(fruitStorageFilter);

    if (!fruitStorage) {
      throw new Error('Fruit Storage not found!');
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const updatedCount = fruitStorage.count! + args.amount!;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (fruitStorage.limit! < updatedCount) {
      throw new Error(`Storage limit exceeded. Cannot add more ${fruit.name}.`);
    }

    const fruitStorageUpdate = {
      count: updatedCount
    };
    const updatedFruitStorage = (
      await FruitStorage.findOneAndUpdate(fruitStorageFilter, fruitStorageUpdate, {
        new: true
      })
    )?.toJSON();

    return {
      ...updatedFruitStorage,
      fruit: fruit.toJSON()
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};

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

export const updateFruitForFruitStorageResolver = async (args: IMutationRequestModel) => {
  // TODO: Validations
  /* 
    1. Limit description to 10 characters
    2. Fruit name should be unique
  */

  try {
    const fruitFilter = { name: args.name };
    const fruit = await Fruit.findOne(fruitFilter);

    if (!fruit) {
      throw new Error('Fruit not found!');
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fruit.description = args.description!;
    const updatedFruit = (await fruit.save()).toJSON();

    const fruitStorageFilter = { fruitId: fruit._id };
    const fruitStorageUpdate = {
      ...(args.limit && { limit: args.limit })
    };
    const updatedFruitStorage = (
      await FruitStorage.findOneAndUpdate(fruitStorageFilter, fruitStorageUpdate, {
        new: true
      })
    )?.toJSON();

    return {
      ...updatedFruitStorage,
      fruit: updatedFruit
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteFruitFromFruitStorageResolver = (args: IMutationRequestModel) => {
  // TODO: Validations
  /* 
    1. Limit description to 10 characters
    2. Fruit name should be unique
  */

  try {
    /* const fruitFilter = { name: args.name };
    const fruit = await Fruit.findOne(fruitFilter);

    if (!fruit) {
      throw new Error('Fruit not found!');
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fruit.description = args.description!;
    const updatedFruit = (await fruit.save()).toJSON();

    const fruitStorageFilter = { fruitId: fruit._id };
    const fruitStorageUpdate = {
      ...(args.limit && { limit: args.limit })
    };
    const updatedFruitStorage = (
      await FruitStorage.findOneAndUpdate(fruitStorageFilter, fruitStorageUpdate, {
        new: true
      })
    )?.toJSON();

    return {
      ...updatedFruitStorage,
      fruit: updatedFruit
    }; */
  } catch (error) {
    console.error(error);
    return error;
  }
};
