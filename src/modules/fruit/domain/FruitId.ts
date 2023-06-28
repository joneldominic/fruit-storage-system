import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import UniqueEntityID from '../../../shared/domain/UniqueEntityID';
import ValueObject from '../../../shared/domain/ValueObject';

interface FruitIdProps {
  value: UniqueEntityID;
}

export default class FruitId extends ValueObject<FruitIdProps> {
  get value(): UniqueEntityID {
    return this.props.value;
  }

  private constructor(value: UniqueEntityID) {
    super({ value });
  }

  public static create(value: UniqueEntityID): Result<FruitId> {
    const guardResult = Guard.againstNullOrUndefined(value, 'value');
    if (guardResult.isFailure) {
      return Result.fail<FruitId>(guardResult.getErrorValue());
    }
    return Result.ok<FruitId>(new FruitId(value));
  }
}
