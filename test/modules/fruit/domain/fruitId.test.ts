import { describe, it, expect } from '@jest/globals';
import FruitId from '../../../../src/modules/fruit/domain/fruitId';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';

describe('FruitId ', () => {
  it('should be able to create FruitId successfully', async () => {
    const fruitId = new UniqueEntityID();
    const fruitIdOrError = FruitId.create(fruitId);

    expect(fruitIdOrError.isSuccess).toBeTruthy();
    expect(fruitIdOrError.getValue().value).toBe(fruitId);
  });
});
