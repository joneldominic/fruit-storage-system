import { describe, it, expect } from '@jest/globals';
import FruitDescription from './fruitDescription';

describe('FruitDescription ', () => {
  it('should be able to create FruitDescription successfully', async () => {
    const fruitDescription = 'this is a lemon';
    const fruitDescriptionOrError = FruitDescription.create({
      value: fruitDescription
    });

    expect(fruitDescriptionOrError.isSuccess).toBeTruthy();
    expect(fruitDescriptionOrError.getValue().value).toBe(fruitDescription);
  });

  it('should fail on creating FruitDescription with an empty string', async () => {
    const fruitDescription = '';
    const fruitDescriptionOrError = FruitDescription.create({
      value: fruitDescription
    });

    expect(fruitDescriptionOrError.isFailure).toBeTruthy();
  });

  it('should fail on creating FruitDescription with value beyond 30 characters', async () => {
    const fruitDescription = 'this is a fruit with a very long description';
    const fruitDescriptionOrError = FruitDescription.create({
      value: fruitDescription
    });

    expect(fruitDescriptionOrError.isFailure).toBeTruthy();
  });
});
