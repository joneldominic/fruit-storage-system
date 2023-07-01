import { describe, it, expect, jest } from '@jest/globals';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';
import Container from '../../../../src/modules/storage/domain/container';

describe('Container', () => {
  it('should be able to create Container successfully', async () => {
    // Arrange
    const containerUniqueId = new UniqueEntityID();
    const fakeContainerId = {
      value: containerUniqueId,
      stringValue: '',
      props: { value: containerUniqueId },
      equals: jest.fn((): boolean => true)
    };

    const uniqueProductId = new UniqueEntityID();
    const fakeProductId = {
      value: uniqueProductId,
      stringValue: '',
      props: { value: uniqueProductId },
      equals: jest.fn((): boolean => true)
    };

    const fakeCapacity = {
      value: 10,
      props: { value: 10 },
      equals: jest.fn((): boolean => true)
    };

    const fakeProductCount = {
      value: 0,
      props: { value: 0 },
      equals: jest.fn((): boolean => true)
    };

    const fakeContainer = {
      productId: fakeProductId,
      capacity: fakeCapacity,
      productCount: fakeProductCount
    };

    // Act
    const containerOrError = Container.create(fakeContainer, fakeContainerId);

    // Assert
    expect(containerOrError.isSuccess).toBeTruthy();
    expect(containerOrError.getValue().containerId.value).toBe(containerUniqueId);
    expect(containerOrError.getValue().productId.value).toBe(uniqueProductId);
    expect(containerOrError.getValue().capacity.value).toBe(fakeCapacity.value);
    expect(containerOrError.getValue().productCount.value).toBe(fakeProductCount.value);
  });

  it('should fail on creating Container when either productId, capacity, productCount is null or undefined', async () => {
    // Arrange
    const containerUniqueId = new UniqueEntityID();
    const fakeContainerId = {
      value: containerUniqueId,
      stringValue: '',
      props: { value: containerUniqueId },
      equals: jest.fn((): boolean => true)
    };

    const fakeProductId: any = null;

    const fakeCapacity = {
      value: 10,
      props: { value: 10 },
      equals: jest.fn((): boolean => true)
    };

    const fakeProductCount = {
      value: 20,
      props: { value: 20 },
      equals: jest.fn((): boolean => true)
    };

    const fakeContainer = {
      productId: fakeProductId,
      capacity: fakeCapacity,
      productCount: fakeProductCount
    };

    // Act
    const containerOrError = Container.create(fakeContainer, fakeContainerId);

    // Assert
    expect(containerOrError.isFailure).toBeTruthy();
  });

  it('should fail on creating Container when ContainerProductCount is greater than ContainerCapacity', async () => {
    // Arrange
    const containerUniqueId = new UniqueEntityID();
    const fakeContainerId = {
      value: containerUniqueId,
      stringValue: '',
      props: { value: containerUniqueId },
      equals: jest.fn((): boolean => true)
    };

    const uniqueProductId = new UniqueEntityID();
    const fakeProductId = {
      value: uniqueProductId,
      stringValue: '',
      props: { value: uniqueProductId },
      equals: jest.fn((): boolean => true)
    };

    const fakeCapacity = {
      value: 10,
      props: { value: 10 },
      equals: jest.fn((): boolean => true)
    };

    const fakeProductCount = {
      value: 20,
      props: { value: 20 },
      equals: jest.fn((): boolean => true)
    };

    const fakeContainer = {
      productId: fakeProductId,
      capacity: fakeCapacity,
      productCount: fakeProductCount
    };

    // Act
    const createContainer = () => {
      Container.create(fakeContainer, fakeContainerId);
    };

    // Assert
    expect(createContainer).toThrow();
  });
});
