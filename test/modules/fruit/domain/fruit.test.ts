import { describe, it, expect, jest } from '@jest/globals';
import Fruit from '../../../../src/modules/fruit/domain/fruit';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';

describe('Fruit ', () => {
  it('should be able to create Fruit successfully', async () => {
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

    const fruit = {
      name: fakeFruitName,
      description: fakeDescription
    };

    // Act
    const fruitOrError = Fruit.create(fruit, fakeFruitId);

    // Assert
    expect(fruitOrError.isSuccess).toBeTruthy();
    expect(fruitOrError.getValue().fruitId.value).toBe(fruitUniqueID);
    expect(fruitOrError.getValue().name.value).toBe(fakeFruitName.value);
    expect(fruitOrError.getValue().description.value).toBe(fakeDescription.value);
  });

  it('should should fail creating fruit when either name or description is null or undefined', async () => {
    // Arrange
    const fruitUniqueID = new UniqueEntityID();
    const fakeFruitId = {
      value: fruitUniqueID,
      stringValue: fruitUniqueID.toString(),
      props: { value: fruitUniqueID },
      equals: jest.fn((): boolean => true)
    };

    const fakeFruitName: any = null;

    const fakeDescription = {
      value: 'this is a lemon',
      props: { value: 'this is a lemon' },
      equals: jest.fn((): boolean => true)
    };

    const fruit = {
      name: fakeFruitName,
      description: fakeDescription
    };

    // Act
    const fruitOrError = Fruit.create(fruit, fakeFruitId);

    // Assert
    expect(fruitOrError.isFailure).toBeTruthy();
  });
});
