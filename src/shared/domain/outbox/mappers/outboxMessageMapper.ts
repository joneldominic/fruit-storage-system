import UniqueEntityID from '../../UniqueEntityID';
import Mapper from '../../../mapper/Mapper';
import OutboxMessage from '../outboxMessage';

export default class OutboxMessageMapper implements Mapper<OutboxMessage> {
  public static toDomain(raw: any): OutboxMessage {
    const outboxMessageOrError = OutboxMessage.create(
      {
        eventId: raw.eventId,
        status: raw.status,
        message: raw.message,
        dateCreated: raw.dateCreated
      },
      new UniqueEntityID(raw._id)
    );

    if (outboxMessageOrError.isFailure || !outboxMessageOrError.isSuccess) {
      console.error(outboxMessageOrError.getErrorValue());
      return outboxMessageOrError.getErrorValue();
    }

    return outboxMessageOrError.getValue();
  }

  public static toPersistence(outboxMessage: OutboxMessage): any {
    return {
      _id: outboxMessage.id,
      eventId: outboxMessage.eventId,
      status: outboxMessage.status,
      message: outboxMessage.message,
      dateCreated: outboxMessage.dateCreated
    };
  }
}
