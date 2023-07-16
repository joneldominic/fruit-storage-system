import UniqueEntityID from '../../UniqueEntityID';
import Mapper from '../../../mapper/Mapper';
import OutboxMessage from '../outboxMessage';

export default class OutboxMessageMapper implements Mapper<OutboxMessage> {
  public static toDomain(raw: any): OutboxMessage {
    const outboxMessageOrError = OutboxMessage.create(
      {
        event: raw.event,
        status: raw.status,
        message: raw.message,
        dateCreated: raw.dateCreated
      },
      new UniqueEntityID(raw.id)
    );

    if (outboxMessageOrError.isFailure || !outboxMessageOrError.isSuccess) {
      console.error(outboxMessageOrError.getErrorValue());
    }

    return outboxMessageOrError.getValue();
  }

  public static toPersistence(outboxMessage: OutboxMessage): any {
    return {
      id: outboxMessage.id,
      event: outboxMessage.event,
      status: outboxMessage.status,
      message: outboxMessage.message,
      dateCreated: outboxMessage.dateCreated
    };
  }
}
