import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import UniqueEntityID from '../../../shared/domain/UniqueEntityID';
import ValueObject from '../../../shared/domain/ValueObject';

interface ProductIdProps {
  value: UniqueEntityID;
}

export default class ProductId extends ValueObject<ProductIdProps> {
  get value(): UniqueEntityID {
    return this.props.value;
  }

  get stringValue(): string {
    return this.props.value.toString();
  }

  private constructor(value: UniqueEntityID) {
    super({ value });
  }

  public static create(value: UniqueEntityID): Result<ProductId> {
    const guardResult = Guard.againstNullOrUndefined(value, 'value');
    if (guardResult.isFailure) {
      return Result.fail<ProductId>(guardResult.getErrorValue());
    }
    return Result.ok<ProductId>(new ProductId(value));
  }
}
