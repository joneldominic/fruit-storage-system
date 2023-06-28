import { describe, it, expect } from '@jest/globals';
import ContainerId from '../../../../src/modules/storage/domain/containerId';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';

describe('ContainerId ', () => {
  it('should be able to create ContainerId successfully', async () => {
    const containerId = new UniqueEntityID();
    const containerIdOrError = ContainerId.create(containerId);

    expect(containerIdOrError.isSuccess).toBeTruthy();
    expect(containerIdOrError.getValue().value).toBe(containerId);
  });
});
