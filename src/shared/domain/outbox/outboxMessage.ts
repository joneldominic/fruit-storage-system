import Entity from '../Entity';
import UniqueEntityID from '../UniqueEntityID';
import { Result } from '../../core/Result';
import { Guard, IGuardArgument } from '../../core/Guard';
import OutboxMessageStatus from './outboxMessageStatus';

interface OutboxMessageProps {
  event: any;
  status: OutboxMessageStatus;
  message: any;
  dateCreated: Date;
}

export default class OutboxMessage extends Entity<OutboxMessageProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get event(): any {
    return this.props.event;
  }

  get status(): OutboxMessageStatus {
    return this.props.status;
  }

  get message(): any {
    return this.props.message;
  }

  get dateCreated(): Date {
    return this.props.dateCreated;
  }

  private constructor(props: OutboxMessageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: OutboxMessageProps, id?: UniqueEntityID): Result<OutboxMessage> {
    const guardArgs: IGuardArgument[] = [
      { argument: props.event, argumentName: 'event' },
      { argument: props.status, argumentName: 'status' },
      { argument: props.message, argumentName: 'message' },
      { argument: props.dateCreated, argumentName: 'dateCreated' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (guardResult.isFailure) {
      return Result.fail<OutboxMessage>(guardResult.getErrorValue());
    }

    const values = { ...props };
    const fruit = new OutboxMessage(values, id);

    return Result.ok<OutboxMessage>(fruit);
  }
}
