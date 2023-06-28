import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import ValueObject from '../../../shared/domain/ValueObject';

interface ContainerCapacityProps {
  value: number;
}

export default class ContainerCapacity extends ValueObject<ContainerCapacityProps> {
  public static minValue: number = 1;

  get value(): number {
    return this.props.value;
  }

  private constructor(props: ContainerCapacityProps) {
    super(props);
  }

  public static create(props: ContainerCapacityProps): Result<ContainerCapacity> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'containerCapacity');

    if (nullGuardResult.isFailure) {
      return Result.fail<ContainerCapacity>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.greaterThanOrEqual(this.minValue, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<ContainerCapacity>(minGuardResult.getErrorValue());
    }

    return Result.ok<ContainerCapacity>(new ContainerCapacity(props));
  }
}
