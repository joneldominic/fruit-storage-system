import { beforeAll, afterEach, afterAll, describe, it, expect, jest } from '@jest/globals';
import { initDatabase, dropCollections, dropDatabase } from '../../../../../setupMongoMemoryServer';
import UniqueEntityID from '../../../../../../src/shared/domain/UniqueEntityID';
import FruitRepository from '../../../../../../src/modules/fruit/repos/implementations/mongoose/fruitRepository';
import Models from '../../../../../../src/shared/infrastructure/database/mongoose/models';

beforeAll(async () => {
  await initDatabase();
});

afterEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await dropDatabase();
});

describe('Mongoose FruitRepository', () => {
  it('should save Fruit successfully', async () => {
    // Arrange
    const fruitUniqueID = new UniqueEntityID();
    const fakeFruitId = {
      value: fruitUniqueID,
      stringValue: fruitUniqueID.toString(),
      props: { value: fruitUniqueID },
      equals: jest.fn((): boolean => true)
    };

    const fakeFruitName = {
      value: 'Lemon',
      props: { value: 'Lemon' },
      equals: jest.fn((): boolean => true)
    };

    const fakeDescription = {
      value: 'this is a lemon',
      props: { value: 'this is a lemon' },
      equals: jest.fn((): boolean => true)
    };

    const fruit: any = {
      id: fruitUniqueID,
      fruitId: fakeFruitId,
      name: fakeFruitName,
      description: fakeDescription,
      props: {
        name: fakeFruitName,
        description: fakeDescription
      },
      equals: jest.fn((): boolean => true)
    };

    const fruitRepository = new FruitRepository(Models);

    // Act
    await fruitRepository.save(fruit);
    const fruitExists = await fruitRepository.exists(fakeFruitName.value);

    // Assert
    expect(fruitExists).toBeTruthy();
  });
});
