import { beforeAll, afterEach, afterAll, describe, it, expect } from '@jest/globals';
import { initDatabase, dropCollections, dropDatabase } from '../setup';
import {
  createFruitForFruitStorageResolver,
  updateFruitForFruitStorageResolver,
  deleteFruitFromFruitStorageResolver,
  storeFruitToFruitStorageResolver,
  removeFruitFromFruitStorageResolver,
  findFruitResolver
} from '../../src/graphql/resolver';
import { Fruit } from '../../src/models/Fruit';
import { seedData } from '../utils';
import { FruitStorage } from '../../src/models/FruitStorage';

beforeAll(async () => {
  await initDatabase();
});

afterEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await dropDatabase();
});

describe('Test createFruitForFruitStorageResolver', () => {
  /**
   * Create a fruit called: `lemon` with the description
   * this is a lemon` and a limit of `10`, this should pass
   */
  it('should create fruit successfully', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10
    };

    await createFruitForFruitStorageResolver(lemon);

    const fruit = await Fruit.findOne({ name: lemon.name });

    expect(fruit?._id).toBeDefined();
    expect(fruit?.name).toBe('lemon');
  });

  /**
   * Create a fruit called: `lemon` with the description
   * `this is a fruit with a very long description` and a limit of `10`;
   * verify this should fail
   */
  it('should fail to create fruit with ver long description', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a fruit with a very long description',
      limit: 10
    };

    const res = await createFruitForFruitStorageResolver(lemon);

    expect(res).toEqual(new Error('Description is too long. Limit it to 30 characters.'));
  });

  /**
   * Create a fruit called: `lemon` with the description
   * `this is a lemon` and a limit of `10` twice, this should fail
   */
  it('should create fruit successfully', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10
    };

    await seedData(lemon);

    const res = await createFruitForFruitStorageResolver(lemon);

    expect(res).toEqual(new Error(`${lemon?.name} already exists.`));
  });
});

describe('Test updateFruitForFruitStorageResolver', () => {
  /**
   * Assume the `lemon` fruit is already created in task 1,
   * in the `createFruitForStorage` do this in a way you see fit
   * (e.g. seeding the database in the test). Call the `updateFruitForFruitStorage`
   * mutation to update the description of the lemon fruit to:
   * `updated lemon description`, verify this should pass
   */
  it('should update the fruit description successfully', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10
    };

    await seedData(lemon);

    const updateParams: any = { name: 'lemon', description: 'updated lemon description' };
    await updateFruitForFruitStorageResolver(updateParams);

    const fruit = await Fruit.findOne({ name: lemon.name });

    expect(fruit?.name).toBe('lemon');
    expect(fruit?.description).toBe(updateParams.description);
  });

  /**
   * Assume the `lemon` fruit is already created in test 1,
   * call the `createFruitForFruitStorage`, do this in a way you see fit
   * (e.g. seeding the database in the test). Call the `updateFruitForFruitStorage`
   * mutation to update the description of the lemon fruit to:
   * `updated lemon with a long description`, verify this should fail
   */
  it('should fail to update the fruit description', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10
    };

    await seedData(lemon);

    const updateParams: any = {
      name: 'lemon',
      description: 'updated lemon with a long description'
    };
    const res = await updateFruitForFruitStorageResolver(updateParams);

    const fruit = await Fruit.findOne({ name: lemon.name });

    expect(fruit?.name).toBe('lemon');
    expect(fruit?.description).toBe(lemon.description);
    expect(res).toEqual(new Error('Description is too long. Limit it to 30 characters.'));
  });
});

describe('Test deleteFruitFromFruitStorageResolver', () => {
  /**
   * Assume the `lemon` fruit is already created in task 1, in the `createFruitForFruitStorage`,
   * do this in a way you see fit (e.g. seeding the database in the test) with an amount of 5 lemons.
   * Call `deleteFruitFromFruitStorage` this should fail
   */
  it('should fail to delete fruit from storage that still contains some item', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10,
      count: 5
    };

    await seedData(lemon);

    const deleteParams: any = { name: lemon.name };
    const res = await deleteFruitFromFruitStorageResolver(deleteParams);

    const fruit = await Fruit.findOne({ name: lemon.name });

    expect(fruit?._id).toBeDefined();
    expect(fruit?.name).toBe('lemon');
    expect(res).toEqual(
      new Error('Cannot delete the fruit. The fruit storage still contains items.')
    );
  });

  /**
   * Assume the `lemon` fruit is already created in task 1, in the `createFruitForFruitStorage`,
   * do this in a way you see fit (e.g. seeding the database in the test)
   * with an amount of 5 lemons. Call `deleteFruitFromFruitStorage` with `forceDelete=true`
   * this should pass & create a domain event
   */
  it('should able to force delete fruit from storage even it still contains some item', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10,
      count: 5
    };

    await seedData(lemon);

    const deleteParams: any = { name: lemon.name, forceDelete: true };
    await deleteFruitFromFruitStorageResolver(deleteParams);

    const fruit = await Fruit.findOne({ name: lemon.name });

    expect(fruit?._id).toBeUndefined();
  });
});

describe('Test storeFruitToFruitStorageResolver', () => {
  /**
   * Assume the `lemon` fruit is already created in task 1, in the `createFruitForFruitStorage`,
   * do this in a way you see fit (e.g. seeding the database in the test)
   * with an amount of 5 lemons. Call `storeFruitToFruitStorage`
   * this should pass as it is below the limit of 10
   */
  it('should be able to store fruit successfully', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10,
      count: 0
    };

    await seedData(lemon);

    const storeParams: any = { name: 'lemon', amount: 5 };
    await storeFruitToFruitStorageResolver(storeParams);

    const fruit = await Fruit.findOne({ name: lemon.name });
    const fruitStorage = await FruitStorage.findOne({ fruitId: fruit?._id });

    expect(fruit?.name).toBe(storeParams.name);
    expect(fruitStorage?.count).toBe(lemon.count + storeParams.amount);
  });

  /**
   * Assume the `lemon` fruit is already created in task 1, in the `createFruitForFruitStorage`,
   * do this in a way you see fit (e.g. seeding the database in the test)
   * with an amount of 11 lemons. Call `storeFruitToStorage`this should fail as it is above the limit of 10
   */
  it('should not be able to store fruit exceeding its storage limit', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10,
      count: 0
    };

    await seedData(lemon);

    const storeParams: any = { name: 'lemon', amount: 11 };
    const res = await storeFruitToFruitStorageResolver(storeParams);

    const fruit = await Fruit.findOne({ name: lemon.name });
    const fruitStorage = await FruitStorage.findOne({ fruitId: fruit?._id });

    expect(fruit?.name).toBe(storeParams.name);
    expect(fruitStorage?.count).toBe(lemon.count);
    expect(res).toEqual(new Error('Storage limit exceeded. Cannot add more lemon.'));
  });
});

describe('Test removeFruitFromFruitStorageResolver', () => {
  /**
   * Assume the `lemon` fruit is already created in task 1, in the `createFruitForFruitStorage`
   * do this in a way you see fit (e.g. seeding the database in the test)
   * with an amount of 5 lemons. Call `removeFruitFromFruitStorage` with:
   * `{name: 'lemon', amount: 5}` this should pass as there are 5 lemons in storage
   */
  it('should be able to remove fruit from storage successfully', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10,
      count: 5
    };

    await seedData(lemon);

    const removeParams: any = { name: 'lemon', amount: 5 };
    await removeFruitFromFruitStorageResolver(removeParams);

    const fruit = await Fruit.findOne({ name: lemon.name });
    const fruitStorage = await FruitStorage.findOne({ fruitId: fruit?._id });

    expect(fruit?.name).toBe(removeParams.name);
    expect(fruitStorage?.count).toBe(lemon.count - removeParams.amount);
  });

  /**
   * Assume the `lemon` fruit is already created in task 1, in the `createFruitForFruitStorage`,
   * do this in a way you see fit (e.g. seeding the database in the test)
   * with an amount of 5 lemons. Call `removeFruitFromFruitStorage` with:
   * `{name: 'lemon', amount: 6}`this should fail as there are 5 lemons in storage
   */
  it('should not be able to remove fruit from storage', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10,
      count: 5
    };

    await seedData(lemon);

    const removeParams: any = { name: 'lemon', amount: 6 };
    const res = await removeFruitFromFruitStorageResolver(removeParams);

    const fruit = await Fruit.findOne({ name: lemon.name });
    const fruitStorage = await FruitStorage.findOne({ fruitId: fruit?._id });

    expect(fruit?.name).toBe(removeParams.name);
    expect(fruitStorage?.count).toBe(lemon.count);
    expect(res).toEqual(
      new Error(
        'Insufficient quantity for deletion. The available count is less than the requested amount.'
      )
    );
  });
});

describe('Test findFruitResolver', () => {
  /**
   * Assume the `lemon` fruit is already created in task 1, in the `createFruitFromFruitStorage`,
   * do this in a way you see fit (e.g. seeding the database in the test).
   * Call the `findFruit` with `{name: 'lemon'}` this should return the lemon object and pass
   */
  it('should be able to find existing fruit', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10
    };

    await seedData(lemon);

    const res: any = await findFruitResolver({ name: lemon.name });

    expect(res.fruit).toBeDefined();
    expect(res.fruit.name).toBe(lemon.name);
  });

  /**
   * Call the `findFruit` with `{name: 'not a lemon'}`
   * this should return not the lemon object and throw an error
   */
  it('should not find non-existent fruit', async () => {
    const lemon: any = {
      name: 'lemon',
      description: 'this is a lemon',
      limit: 10
    };

    await seedData(lemon);

    const res: any = await findFruitResolver({ name: 'not a lemon' });

    expect(res.fruit).toBeUndefined();
    expect(res).toEqual(new Error('Fruit not found!'));
  });
});
