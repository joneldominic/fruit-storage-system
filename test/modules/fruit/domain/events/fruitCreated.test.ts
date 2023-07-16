import { describe, it, expect, jest } from '@jest/globals';
import FruitCreated from '../../../../../src/modules/fruit/domain/events/fruitCreated';
import UniqueEntityID from '../../../../../src/shared/domain/UniqueEntityID';

describe('FruitCreated Event', () => {
  it('should be able to create FruitCreated event', async () => {
    // Arrange
    const fruitUniqueID = new UniqueEntityID();
    const fakeFruitId = {
      value: fruitUniqueID,
      stringValue: fruitUniqueID.toString(),
      props: { value: fruitUniqueID },
      equals: jest.fn((): boolean => true)
    };

    const fakeFruitName = {
      value: 'Lemon',
      props: { value: 'Lemon' },
      equals: jest.fn((): boolean => true)
    };

    const fakeDescription = {
      value: 'this is a lemon',
      props: { value: 'this is a lemon' },
      equals: jest.fn((): boolean => true)
    };

    const fruit: any = {
      id: fruitUniqueID,
      fruitId: fakeFruitId,
      name: fakeFruitName,
      description: fakeDescription,
      props: {
        name: fakeFruitName,
        description: fakeDescription
      },
      equals: jest.fn((): boolean => true)
    };

    // Act
    const fruitCreatedEvent = new FruitCreated(fruit);

    // Assert
    expect(fruitCreatedEvent.id).toBe('FRUIT_CREATED');
    expect(FruitCreated.fromJSONString(fruitCreatedEvent.toJSONString())).toHaveProperty('id');
    expect(FruitCreated.fromJSONString(fruitCreatedEvent.toJSONString())).toHaveProperty(
      'dateTimeOccurred'
    );
    expect(FruitCreated.fromJSONString(fruitCreatedEvent.toJSONString())).toHaveProperty('fruit');
  });
});
