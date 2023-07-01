import { describe, it, expect } from '@jest/globals';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';
import Container from '../../../../src/modules/storage/domain/container';
import ContainerCapacity from '../../../../src/modules/storage/domain/containerCapacity';
import ContainerProductCount from '../../../../src/modules/storage/domain/containerProductCount';
import ContainerId from '../../../../src/modules/storage/domain/containerId';

describe('Container', () => {
  const productId = new UniqueEntityID();
  const mockProductId = {
    value: productId,
    stringValue: '',
    props: { value: productId },
    equals: () => true
  };

  it('should be able to create Container successfully', async () => {
    const capacity = 10;
    const expectedProductCount = 0;

    const containedId = new UniqueEntityID();
    const container = {
      productId: mockProductId,
      capacity: ContainerCapacity.create(capacity).getValue(),
      productCount: ContainerProductCount.create().getValue()
    };

    const containerOrError = Container.create(
      container,
      ContainerId.create(containedId).getValue()
    );

    expect(containerOrError.isSuccess).toBeTruthy();
    expect(containerOrError.getValue().containerId.value).toBe(containedId);
    expect(containerOrError.getValue().productId.value).toBe(productId);
    expect(containerOrError.getValue().capacity.value).toBe(capacity);
    expect(containerOrError.getValue().productCount.value).toBe(expectedProductCount);
  });

  it('should fail on creating Container with invalid ContainerCapacity', async () => {
    const capacity = -10;
    const productCount = 10;

    const createContainer = () => {
      const container = {
        productId: mockProductId,
        capacity: ContainerCapacity.create(capacity).getValue(),
        productCount: ContainerProductCount.create(productCount).getValue()
      };

      Container.create(container);
    };

    expect(createContainer).toThrow();
  });

  it('should fail on creating Container with invalid ContainerProductCount', async () => {
    const capacity = 10;
    const productCount = -10;

    const createContainer = () => {
      const container = {
        productId: mockProductId,
        capacity: ContainerCapacity.create(capacity).getValue(),
        productCount: ContainerProductCount.create(productCount).getValue()
      };

      Container.create(container);
    };

    expect(createContainer).toThrow();
  });

  it('should fail on creating Container when ContainerProductCount is greater than ContainerCapacity', async () => {
    const capacity = 10;
    const productCount = 20;

    const createContainer = () => {
      const container = {
        productId: mockProductId,
        capacity: ContainerCapacity.create(capacity).getValue(),
        productCount: ContainerProductCount.create(productCount).getValue()
      };

      Container.create(container);
    };

    expect(createContainer).toThrow();
  });
});
