import { Guard, IGuardArgument } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import AggregateRoot from '../../../shared/domain/AggregateRoot';
import ContainerCapacity from './containerCapacity';
import ContainerId from './containerId';
import ContainerProductCount from './containerProductCount';
import ProductId from './productId';

interface ContainerProps {
  productId: ProductId;
  capacity: ContainerCapacity;
  productCount: ContainerProductCount;
}

export default class Container extends AggregateRoot<ContainerProps> {
  get containerId(): ContainerId {
    return ContainerId.create(this.id).getValue();
  }

  get productId(): ProductId {
    return this.props.productId;
  }

  get capacity(): ContainerCapacity {
    return this.props.capacity;
  }

  get productCount(): ContainerProductCount {
    return this.props.productCount;
  }

  private constructor(props: ContainerProps, containerId?: ContainerId) {
    super(props, containerId?.value);
  }

  public static create(props: ContainerProps, containerId?: ContainerId): Result<Container> {
    const guardArgs: IGuardArgument[] = [
      { argument: props.productId, argumentName: 'productId' },
      { argument: props.capacity, argumentName: 'capacity' },
      { argument: props.productCount, argumentName: 'productCount' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (guardResult.isFailure) {
      return Result.fail<Container>(guardResult.getErrorValue());
    }

    const maxProductCountGuardResult = Guard.lessThanOrEqual(
      props.capacity.value,
      props.productCount.value
    );

    if (maxProductCountGuardResult.isFailure) {
      return Result.fail<Container>(guardResult.getErrorValue());
    }

    const isNewContainer = !!containerId === false;

    const values = { ...props };
    const container = new Container(values, containerId);

    if (isNewContainer) {
      // TODO-JONEL: Add domain event
    }

    return Result.ok<Container>(container);
  }
}
