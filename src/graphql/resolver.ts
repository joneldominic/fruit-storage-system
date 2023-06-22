import { Fruit } from '../models/Fruit';
import { FruitStorage } from '../models/FruitStorage';

interface IQueryRequestModel {
  name: string;
}

interface IMutationRequestModel {
  name: string | undefined;
  amount: number | undefined;
  description: string | undefined;
  limit: number | undefined;
  forceDelete: boolean | undefined;
}

export const findFruitResolver = async (args: IQueryRequestModel) => {
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

    return {
      ...fruitStorage.toJSON(),
      fruit: fruit.toJSON()
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const storeFruitToFruitStorageResolver = async (args: IMutationRequestModel) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (args.amount! <= 0) {
      throw new Error('Invalid amount. Please provide a positive number.');
    }

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

export const removeFruitFromFruitStorageResolver = async (args: IMutationRequestModel) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (args.amount! <= 0) {
      throw new Error('Invalid amount. Please provide a positive number.');
    }

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
    const updatedCount = fruitStorage.count! - args.amount!;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (updatedCount < 0) {
      throw new Error(
        'Insufficient quantity for deletion. The available count is less than the requested amount.'
      );
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

export const createFruitForFruitStorageResolver = async (args: IMutationRequestModel) => {
  try {
    const existingFruit = await Fruit.findOne({ name: args.name });
    if (existingFruit) {
      throw new Error(`${args.name} already exists.`);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (args.description!.length! > 30) {
      throw new Error('Description is too long. Limit it to 30 characters.');
    }

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
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (args.description!.length! > 30) {
      throw new Error('Description is too long. Limit it to 30 characters.');
    }

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

export const deleteFruitFromFruitStorageResolver = async (args: IMutationRequestModel) => {
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
    const storageHasFruit = fruitStorage.count! > 0;
    if (storageHasFruit && !args.forceDelete) {
      throw new Error('Cannot delete the fruit. The fruit storage still contains items.');
    }

    await FruitStorage.deleteOne(fruitStorageFilter);
    await Fruit.deleteOne(fruitFilter);

    return {
      ...fruitStorage.toJSON(),
      fruit: fruit.toJSON()
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};
