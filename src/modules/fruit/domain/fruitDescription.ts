import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import ValueObject from '../../../shared/domain/ValueObject';

interface FruitDescriptionProps {
  value: string;
}

export default class FruitDescription extends ValueObject<FruitDescriptionProps> {
  public static minLength: number = 1;

  public static maxLength: number = 30;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: FruitDescriptionProps) {
    super(props);
  }

  public static create(props: FruitDescriptionProps): Result<FruitDescription> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'fruitDescription');

    if (nullGuardResult.isFailure) {
      return Result.fail<FruitDescription>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<FruitDescription>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<FruitDescription>(maxGuardResult.getErrorValue());
    }

    return Result.ok<FruitDescription>(new FruitDescription(props));
  }
}
