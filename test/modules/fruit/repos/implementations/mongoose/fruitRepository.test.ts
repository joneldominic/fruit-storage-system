import { beforeAll, afterEach, afterAll, describe, it, expect } from '@jest/globals';
import { initDatabase, dropCollections, dropDatabase } from './setupMongoMemoryServer';
import UniqueEntityID from '../../../../../../src/shared/domain/UniqueEntityID';
import FruitId from '../../../../../../src/modules/fruit/domain/fruitId';
import FruitName from '../../../../../../src/modules/fruit/domain/fruitName';
import FruitDescription from '../../../../../../src/modules/fruit/domain/fruitDescription';
import Fruit from '../../../../../../src/modules/fruit/domain/fruit';
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

const fruitId = FruitId.create(new UniqueEntityID());
const fruitName = FruitName.create({ value: 'lemon' });
const fruitDescription = FruitDescription.create({ value: 'this is a lemon' });
const fruitData = Fruit.create(
  {
    name: fruitName.getValue(),
    description: fruitDescription.getValue()
  },
  fruitId.getValue().value
).getValue();

describe('Mongoose FruitRepository', () => {
  it('should save Fruit successfully', async () => {
    const fruitRepository = new FruitRepository(Models);

    await fruitRepository.save(fruitData);

    const fruitExists = await fruitRepository.exists(fruitName.getValue().value);
    expect(fruitExists).toBeTruthy();
  });
});
