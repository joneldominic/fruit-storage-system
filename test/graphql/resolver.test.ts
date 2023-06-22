import { beforeAll, afterEach, afterAll, describe, it, expect } from '@jest/globals';
import { initDatabase, dropCollections, dropDatabase } from '../setup';
import {
  createFruitForFruitStorageResolver,
  updateFruitForFruitStorageResolver
} from '../../src/graphql/resolver';
import { Fruit } from '../../src/models/Fruit';
import { seedData } from '../utils';

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
