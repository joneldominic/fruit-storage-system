import { describe, it, expect } from '@jest/globals';
import FruitId from './FruitId';
import UniqueEntityID from '../../../shared/domain/UniqueEntityID';

describe('FruitId ', () => {
  it('should be able to create FruitId successfully', async () => {
    const fruitId = new UniqueEntityID();
    const fruitNameOrError = FruitId.create(fruitId);

    expect(fruitNameOrError.isSuccess).toBeTruthy();
    expect(fruitNameOrError.getValue().value).toBe(fruitId);
  });
});
