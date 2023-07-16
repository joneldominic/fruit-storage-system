import { MongooseModels } from '../../../../../infrastructure/database/mongoose/models';
import OutboxMessage from '../../../outboxMessage';
import OutboxMessageStatus from '../../../outboxMessageStatus';
import IOutboxRepository from '../../outboxRepository';
import OutboxMessageMapper from '../../../mappers/outboxMessageMapper';

export default class OutboxRepository implements IOutboxRepository {
  private models: MongooseModels;

  constructor(models: MongooseModels) {
    this.models = models;
  }

  async addMessage(message: OutboxMessage): Promise<void> {
    const OutboxMessageModel = this.models.OutboxMessage;
    const outboxMessage = OutboxMessageMapper.toPersistence(message);

    await OutboxMessageModel.create(outboxMessage);
  }

  async getPendingMessages(): Promise<OutboxMessage[]> {
    const OutboxMessageModel = this.models.OutboxMessage;

    const pendingMessages = await OutboxMessageModel.find({
      status: OutboxMessageStatus.PENDING
    }).lean();

    const rawPendingMessages: OutboxMessage[] = pendingMessages.map((message) =>
      OutboxMessageMapper.toDomain(message)
    );

    return rawPendingMessages;
  }

  async markMessageAsPublished(message: OutboxMessage): Promise<void> {
    const OutboxMessageModel = this.models.OutboxMessage;

    const filter = { _id: message.id };
    const update = { status: OutboxMessageStatus.DONE };

    await OutboxMessageModel.updateOne(filter, update);
  }
}
