import { describe, it, expect } from '@jest/globals';
import FruitName from '../../../../src/modules/fruit/domain/fruitName';

describe('FruitName ', () => {
  it('should be able to create FruitName successfully', async () => {
    // Arrange
    const validFruitName = 'Lemon';

    // Act
    const fruitNameOrError = FruitName.create({
      value: validFruitName
    });

    // Assert
    expect(fruitNameOrError.isSuccess).toBeTruthy();
    expect(fruitNameOrError.getValue().value).toBe(validFruitName);
  });

  it('should fail on creating FruitName with an empty string', async () => {
    // Arrange
    const invalidFruitName = '';

    // Act
    const fruitOrError = FruitName.create({
      value: invalidFruitName
    });

    // Assert
    expect(fruitOrError.isFailure).toBeTruthy();
  });
});
