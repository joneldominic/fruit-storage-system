import { Guard, IGuardArgument } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import AggregateRoot from '../../../shared/domain/AggregateRoot';
import FruitId from './fruitId';
import FruitDescription from './fruitDescription';
import FruitName from './fruitName';

interface FruitProps {
  name: FruitName;
  description: FruitDescription;
}

export default class Fruit extends AggregateRoot<FruitProps> {
  get fruitId(): FruitId {
    return FruitId.create(this.id).getValue();
  }

  get name(): FruitName {
    return this.props.name;
  }

  get description(): FruitDescription {
    return this.props.description;
  }

  private constructor(props: FruitProps, fruitId?: FruitId) {
    super(props, fruitId?.value);
  }

  public static create(props: FruitProps, fruitId?: FruitId): Result<Fruit> {
    const guardArgs: IGuardArgument[] = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.description, argumentName: 'description' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (guardResult.isFailure) {
      return Result.fail<Fruit>(guardResult.getErrorValue());
    }

    const values = { ...props };
    const fruit = new Fruit(values, fruitId);

    return Result.ok<Fruit>(fruit);
  }
}
