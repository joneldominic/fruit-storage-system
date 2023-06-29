import { describe, it, expect } from '@jest/globals';
import FruitName from '../../../../src/modules/fruit/domain/fruitName';
import FruitDescription from '../../../../src/modules/fruit/domain/fruitDescription';
import FruitMap from '../../../../src/modules/fruit/mappers/fruitMap';
import Fruit from '../../../../src/modules/fruit/domain/fruit';
import FruitId from '../../../../src/modules/fruit/domain/fruitId';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';

const fruitId = FruitId.create(new UniqueEntityID());
const fruitName = FruitName.create({ value: 'lemon' });
const fruitDescription = FruitDescription.create({ value: 'this is a lemon' });
const fruitData = Fruit.create(
  {
    name: fruitName.getValue(),
    description: fruitDescription.getValue()
  },
  fruitId.getValue().value
).getValue();

describe('FruitDTO ', () => {
  it('should be able to map Fruit to DTO', async () => {
    const mappedFruitDTO = FruitMap.toDTO(fruitData);

    expect(mappedFruitDTO).toHaveProperty('name');
    expect(mappedFruitDTO).toHaveProperty('description');
    expect(mappedFruitDTO.name).toBe(fruitName.getValue().value);
    expect(mappedFruitDTO.description).toBe(fruitDescription.getValue().value);
  });

  it('should be able to map raw object to Fruit', async () => {
    const fruitRawData = {
      id: fruitId.getValue().stringValue,
      name: 'lemon',
      description: 'this is a lemon'
    };
    const mappedFruitDomain = FruitMap.toDomain(fruitRawData);

    expect(mappedFruitDomain).toBeInstanceOf(Fruit);
    expect(mappedFruitDomain.fruitId.stringValue).toBe(fruitRawData.id);
    expect(mappedFruitDomain.name.value).toBe(fruitRawData.name);
    expect(mappedFruitDomain.description.value).toBe(fruitRawData.description);
  });

  it('should be able to map Fruit into persistence object', async () => {
    const mappedFruitPersistence = FruitMap.toPersistence(fruitData);

    expect(mappedFruitPersistence).toHaveProperty('id');
    expect(mappedFruitPersistence).toHaveProperty('name');
    expect(mappedFruitPersistence).toHaveProperty('description');
    expect(mappedFruitPersistence.id).toBe(fruitId.getValue().stringValue);
    expect(mappedFruitPersistence.name).toBe(fruitName.getValue().value);
    expect(mappedFruitPersistence.description).toBe(fruitDescription.getValue().value);
  });
});
