import { describe, it, expect } from '@jest/globals';
import FruitId from '../../../../src/modules/fruit/domain/FruitId';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';

describe('FruitId ', () => {
  it('should be able to create FruitId successfully', async () => {
    const fruitId = new UniqueEntityID();
    const fruitNameOrError = FruitId.create(fruitId);

    expect(fruitNameOrError.isSuccess).toBeTruthy();
    expect(fruitNameOrError.getValue().value).toBe(fruitId);
  });
});
