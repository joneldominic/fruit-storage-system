import { describe, it, expect } from '@jest/globals';
import FruitName from '../../../../src/modules/fruit/domain/fruitName';
import Fruit from '../../../../src/modules/fruit/domain/fruit';
import FruitDescription from '../../../../src/modules/fruit/domain/fruitDescription';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';
import FruitId from '../../../../src/modules/fruit/domain/fruitId';

describe('Fruit ', () => {
  it('should be able to create Fruit successfully', async () => {
    const fruitId = new UniqueEntityID();
    const fruitName = 'Lemon';
    const fruitDescription = 'this is a lemon';

    const fruit = {
      name: FruitName.create({
        value: fruitName
      }).getValue(),
      description: FruitDescription.create({
        value: fruitDescription
      }).getValue()
    };

    const fruitOrError = Fruit.create(fruit, FruitId.create(fruitId).getValue());

    expect(fruitOrError.isSuccess).toBeTruthy();
    expect(fruitOrError.getValue().fruitId.value).toBe(fruitId);
    expect(fruitOrError.getValue().name.value).toBe(fruitName);
    expect(fruitOrError.getValue().description.value).toBe(fruitDescription);
  });

  it('should fail on creating fruit with empty FruitName', async () => {
    const fruitName = '';
    const fruitDescription = 'this is a lemon';

    const createFruit = () => {
      const fruit = {
        name: FruitName.create({
          value: fruitName
        }).getValue(),
        description: FruitDescription.create({
          value: fruitDescription
        }).getValue()
      };

      Fruit.create(fruit);
    };

    expect(createFruit).toThrow();
  });

  it('should fail on creating fruit with empty FruitDescription', async () => {
    const fruitName = 'Lemon';
    const fruitDescription = '';

    const createFruit = () => {
      const fruit = {
        name: FruitName.create({
          value: fruitName
        }).getValue(),
        description: FruitDescription.create({
          value: fruitDescription
        }).getValue()
      };

      Fruit.create(fruit);
    };

    expect(createFruit).toThrow();
  });

  it('should fail on creating fruit with FruitDescription value beyond 30 characters', async () => {
    const fruitName = 'Lemon';
    const fruitDescription = 'this is a fruit with a very long description';

    const createFruit = () => {
      const fruit = {
        name: FruitName.create({
          value: fruitName
        }).getValue(),
        description: FruitDescription.create({
          value: fruitDescription
        }).getValue()
      };

      Fruit.create(fruit);
    };

    expect(createFruit).toThrow();
  });
});
