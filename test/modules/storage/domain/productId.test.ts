import { describe, it, expect } from '@jest/globals';
import ProductId from '../../../../src/modules/storage/domain/productId';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';

describe('ProductId ', () => {
  it('should be able to create ProductId successfully', async () => {
    // Arrange
    const validProductId = new UniqueEntityID();

    // Act
    const productIdOrError = ProductId.create(validProductId);

    // Assert
    expect(productIdOrError.isSuccess).toBeTruthy();
    expect(productIdOrError.getValue().value).toBe(validProductId);
  });
});
