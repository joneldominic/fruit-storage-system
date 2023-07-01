import { describe, it, expect } from '@jest/globals';
import FruitId from '../../../../src/modules/fruit/domain/fruitId';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';

describe('FruitId ', () => {
  it('should be able to create FruitId successfully', async () => {
    // Arrange
    const validFruitId = new UniqueEntityID();

    // Act
    const fruitIdOrError = FruitId.create(validFruitId);

    // Assert
    expect(fruitIdOrError.isSuccess).toBeTruthy();
    expect(fruitIdOrError.getValue().value).toBe(validFruitId);
  });
});
