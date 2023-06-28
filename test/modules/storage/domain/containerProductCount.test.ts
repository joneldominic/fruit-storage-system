import { describe, it, expect } from '@jest/globals';
import ContainerProductCount from '../../../../src/modules/storage/domain/containerProductCount';

describe('ContainerProductCount ', () => {
  it('should be able to create ContainerProductCount successfully', async () => {
    const productCount = 1;
    const containerProductCountOrError = ContainerProductCount.create(productCount);

    expect(containerProductCountOrError.isSuccess).toBeTruthy();
    expect(containerProductCountOrError.getValue().value).toBe(productCount);
  });

  it('should be able to create ContainerProductCount successfully with default value', async () => {
    const expectedProductCount = 0;

    const containerProductCountOrError = ContainerProductCount.create();

    expect(containerProductCountOrError.isSuccess).toBeTruthy();
    expect(containerProductCountOrError.getValue().value).toBe(expectedProductCount);
  });

  it('should be able to create ContainerProductCount successfully with value equal to 0', async () => {
    const productCount = 0;
    const containerProductCountOrError = ContainerProductCount.create(productCount);

    expect(containerProductCountOrError.isSuccess).toBeTruthy();
    expect(containerProductCountOrError.getValue().value).toBe(productCount);
  });

  it('should fail on creating ContainerProductCount with negative value', async () => {
    const productCount = -1;
    const containerProductCountOrError = ContainerProductCount.create(productCount);

    expect(containerProductCountOrError.isFailure).toBeTruthy();
  });
});
