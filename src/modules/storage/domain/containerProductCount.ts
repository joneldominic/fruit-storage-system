import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import ValueObject from '../../../shared/domain/ValueObject';

interface ContainerProductCountProps {
  value: number;
}

export default class ContainerProductCount extends ValueObject<ContainerProductCountProps> {
  public static minValue: number = 0;

  get value(): number {
    return this.props.value;
  }

  private constructor(value?: number) {
    super({ value: value || 0 });
  }

  public static create(value?: number): Result<ContainerProductCount> {
    const minGuardResult = Guard.greaterThanOrEqual(this.minValue, value || 0);

    if (minGuardResult.isFailure) {
      return Result.fail<ContainerProductCount>(minGuardResult.getErrorValue());
    }

    return Result.ok<ContainerProductCount>(new ContainerProductCount(value));
  }
}
