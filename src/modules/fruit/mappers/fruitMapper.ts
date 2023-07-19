import UniqueEntityID from '../../../shared/domain/UniqueEntityID';
import Mapper from '../../../shared/mapper/Mapper';
import Fruit from '../domain/fruit';
import FruitDescription from '../domain/fruitDescription';
import FruitId from '../domain/fruitId';
import FruitName from '../domain/fruitName';
import { FruitDTO } from '../dtos/fruitDTO';

export default class FruitMapper implements Mapper<Fruit> {
  public static toDTO(fruit: Fruit): FruitDTO {
    return {
      id: fruit.id.toString(),
      name: fruit.name.value,
      description: fruit.description.value
    };
  }

  public static toDomain(raw: any): Fruit {
    const fruitIdOrEmpty = FruitId.create(new UniqueEntityID(raw.id));
    const fruitNameOrError = FruitName.create({ value: raw.name });
    const fruitDescriptionOrError = FruitDescription.create({ value: raw.description });

    const fruitOrError = Fruit.create(
      {
        name: fruitNameOrError.getValue(),
        description: fruitDescriptionOrError.getValue()
      },
      fruitIdOrEmpty.getValue()
    );

    if (fruitOrError.isFailure || !fruitOrError.isSuccess) {
      console.error(fruitOrError.getErrorValue());
    }

    return fruitOrError.getValue();
  }

  public static toPersistence(fruit: Fruit): any {
    return {
      _id: fruit.fruitId.stringValue,
      name: fruit.name.value,
      description: fruit.description.value
    };
  }
}
