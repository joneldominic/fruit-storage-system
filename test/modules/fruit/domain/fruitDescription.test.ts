import { describe, it, expect } from '@jest/globals';
import FruitDescription from '../../../../src/modules/fruit/domain/fruitDescription';

describe('FruitDescription ', () => {
  it('should be able to create FruitDescription successfully', async () => {
    // Arrange
    const validFruitDescription = 'this is a lemon';

    // Act
    const fruitDescriptionOrError = FruitDescription.create({
      value: validFruitDescription
    });

    // Assert
    expect(fruitDescriptionOrError.isSuccess).toBeTruthy();
    expect(fruitDescriptionOrError.getValue().value).toBe(validFruitDescription);
  });

  it('should fail on creating FruitDescription with an empty string', async () => {
    // Arrange
    const invalidFruitDescription = '';

    // Act
    const fruitDescriptionOrError = FruitDescription.create({
      value: invalidFruitDescription
    });

    // Assert
    expect(fruitDescriptionOrError.isFailure).toBeTruthy();
  });

  it('should fail on creating FruitDescription with value beyond 30 characters', async () => {
    // Arrange
    const invalidFruitDescription = 'this is a fruit with a very long description';

    // Act
    const fruitDescriptionOrError = FruitDescription.create({
      value: invalidFruitDescription
    });

    // Assert
    expect(fruitDescriptionOrError.isFailure).toBeTruthy();
  });
});
