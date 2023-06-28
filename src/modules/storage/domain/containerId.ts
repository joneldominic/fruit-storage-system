import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import UniqueEntityID from '../../../shared/domain/UniqueEntityID';
import ValueObject from '../../../shared/domain/ValueObject';

interface ContainerIdProps {
  value: UniqueEntityID;
}

export default class ContainerId extends ValueObject<ContainerIdProps> {
  get value(): UniqueEntityID {
    return this.props.value;
  }

  get stringValue(): string {
    return this.props.value.toString();
  }

  private constructor(value: UniqueEntityID) {
    super({ value });
  }

  public static create(value: UniqueEntityID): Result<ContainerId> {
    const guardResult = Guard.againstNullOrUndefined(value, 'value');
    if (guardResult.isFailure) {
      return Result.fail<ContainerId>(guardResult.getErrorValue());
    }
    return Result.ok<ContainerId>(new ContainerId(value));
  }
}
