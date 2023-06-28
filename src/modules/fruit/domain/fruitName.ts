import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import ValueObject from '../../../shared/domain/ValueObject';

interface FruitNameProps {
  value: string;
}

export default class FruitName extends ValueObject<FruitNameProps> {
  public static minLength: number = 1;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: FruitNameProps) {
    super(props);
  }

  public static create(props: FruitNameProps): Result<FruitName> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'fruitName');

    if (nullGuardResult.isFailure) {
      return Result.fail<FruitName>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<FruitName>(minGuardResult.getErrorValue());
    }

    return Result.ok<FruitName>(new FruitName(props));
  }
}
