import { describe, it, expect } from '@jest/globals';
import ContainerCapacity from '../../../../src/modules/storage/domain/containerCapacity';

describe('ContainerCapacity ', () => {
  it('should be able to create ContainerCapacity successfully', async () => {
    // Arrange
    const validCapacity = 1;

    // Act
    const containerCapacityOrError = ContainerCapacity.create(validCapacity);

    // Assert
    expect(containerCapacityOrError.isSuccess).toBeTruthy();
    expect(containerCapacityOrError.getValue().value).toBe(validCapacity);
  });

  it('should fail on creating ContainerCapacity with value equal to 0', async () => {
    // Arrange
    const invalidCapacity = 0;

    // Act
    const containerCapacityOrError = ContainerCapacity.create(invalidCapacity);

    // Assert
    expect(containerCapacityOrError.isFailure).toBeTruthy();
  });

  it('should fail on creating ContainerCapacity with negative value', async () => {
    // Arrange
    const invalidCapacity = -1;

    // Act
    const containerCapacityOrError = ContainerCapacity.create(invalidCapacity);

    // Assert
    expect(containerCapacityOrError.isFailure).toBeTruthy();
  });
});
