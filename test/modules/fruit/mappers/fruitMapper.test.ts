import { describe, it, expect, jest } from '@jest/globals';
import FruitMapper from '../../../../src/modules/fruit/mappers/fruitMapper';
import Fruit from '../../../../src/modules/fruit/domain/fruit';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';

describe('FruitDTO ', () => {
  it('should be able to map Fruit to DTO', async () => {
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
    const mappedFruitDTO = FruitMapper.toDTO(fruit);

    // Assert
    expect(mappedFruitDTO.name).toBe(fakeFruitName.value);
    expect(mappedFruitDTO.description).toBe(fakeDescription.value);
  });

  it('should be able to map raw object to Fruit', async () => {
    // Arrange
    const fruitUniqueID = new UniqueEntityID();
    const fruitRawData = {
      id: fruitUniqueID,
      name: 'lemon',
      description: 'this is a lemon'
    };

    // Act
    const mappedFruitDomain = FruitMapper.toDomain(fruitRawData);

    // Assert
    expect(mappedFruitDomain).toBeInstanceOf(Fruit);
    expect(mappedFruitDomain.fruitId.stringValue).toBe(fruitRawData.id.toString());
    expect(mappedFruitDomain.name.value).toBe(fruitRawData.name);
    expect(mappedFruitDomain.description.value).toBe(fruitRawData.description);
  });

  it('should be able to map Fruit into persistence object', async () => {
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
    const mappedFruitPersistence = FruitMapper.toPersistence(fruit);

    // Assert
    expect(mappedFruitPersistence._id).toBe(fakeFruitId.stringValue);
    expect(mappedFruitPersistence.name).toBe(fakeFruitName.value);
    expect(mappedFruitPersistence.description).toBe(fakeDescription.value);
  });
});
