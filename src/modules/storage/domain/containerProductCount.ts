import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import ValueObject from '../../../shared/domain/ValueObject';

interface ContainerProductCountProps {
  value: number;
}

export default class ContainerProductCount extends ValueObject<ContainerProductCountProps> {
  public static minValue: number = 1;

  get value(): number {
    return this.props.value;
  }

  private constructor(props: ContainerProductCountProps) {
    super(props);
  }

  public static create(props: ContainerProductCountProps): Result<ContainerProductCount> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'containerProductCount');

    if (nullGuardResult.isFailure) {
      return Result.fail<ContainerProductCount>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.greaterThanOrEqual(this.minValue, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<ContainerProductCount>(minGuardResult.getErrorValue());
    }

    return Result.ok<ContainerProductCount>(new ContainerProductCount(props));
  }
}
