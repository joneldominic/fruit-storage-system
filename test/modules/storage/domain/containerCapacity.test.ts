import { describe, it, expect } from '@jest/globals';
import ContainerCapacity from '../../../../src/modules/storage/domain/containerCapacity';

describe('ContainerCapacity ', () => {
  it('should be able to create ContainerCapacity successfully', async () => {
    const capacity = 1;
    const containerCapacityOrError = ContainerCapacity.create(capacity);

    expect(containerCapacityOrError.isSuccess).toBeTruthy();
    expect(containerCapacityOrError.getValue().value).toBe(capacity);
  });

  it('should fail on creating ContainerCapacity with value equal to 0', async () => {
    const capacity = 0;
    const containerCapacityOrError = ContainerCapacity.create(capacity);

    expect(containerCapacityOrError.isFailure).toBeTruthy();
  });

  it('should fail on creating ContainerCapacity with negative value', async () => {
    const capacity = -1;
    const containerCapacityOrError = ContainerCapacity.create(capacity);

    expect(containerCapacityOrError.isFailure).toBeTruthy();
  });
});
