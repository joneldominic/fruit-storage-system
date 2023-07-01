import { describe, it, expect } from '@jest/globals';
import ContainerProductCount from '../../../../src/modules/storage/domain/containerProductCount';

describe('ContainerProductCount ', () => {
  it('should be able to create ContainerProductCount successfully', async () => {
    // Arrange
    const validProductCount = 1;

    // Act
    const containerProductCountOrError = ContainerProductCount.create(validProductCount);

    // Assert
    expect(containerProductCountOrError.isSuccess).toBeTruthy();
    expect(containerProductCountOrError.getValue().value).toBe(validProductCount);
  });

  it('should be able to create ContainerProductCount successfully with default value', async () => {
    // Arrange
    const expectedProductCount = 0;

    // Act
    const containerProductCountOrError = ContainerProductCount.create();

    // Assert
    expect(containerProductCountOrError.isSuccess).toBeTruthy();
    expect(containerProductCountOrError.getValue().value).toBe(expectedProductCount);
  });

  it('should be able to create ContainerProductCount successfully with value equal to 0', async () => {
    // Act
    const validProductCount = 0;

    // Arrange
    const containerProductCountOrError = ContainerProductCount.create(validProductCount);

    // Assert
    expect(containerProductCountOrError.isSuccess).toBeTruthy();
    expect(containerProductCountOrError.getValue().value).toBe(validProductCount);
  });

  it('should fail on creating ContainerProductCount with negative value', async () => {
    // Arrange
    const invalidProductCount = -1;

    // Act
    const containerProductCountOrError = ContainerProductCount.create(invalidProductCount);

    // Assert
    expect(containerProductCountOrError.isFailure).toBeTruthy();
  });
});
