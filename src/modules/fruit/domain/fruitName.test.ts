import { describe, it, expect } from '@jest/globals';
import FruitName from './fruitName';

describe('FruitName ', () => {
  it('should be able to create FruitName successfully', async () => {
    const fruitName = 'Lemon';
    const fruitNameOrError = FruitName.create({
      value: fruitName
    });

    expect(fruitNameOrError.isSuccess).toBeTruthy();
    expect(fruitNameOrError.getValue().value).toBe(fruitName);
  });

  it('should fail on creating FruitName with an empty string', async () => {
    const fruitName = '';
    const fruitOrError = FruitName.create({
      value: fruitName
    });

    expect(fruitOrError.isFailure).toBeTruthy();
  });
});
