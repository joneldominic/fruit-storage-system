import { FRUIT_CREATED_EVENT_ID } from '../../../../modules/fruit/domain/events/fruitCreated';
import IOutboxRepository from '../../../domain/outbox/repos/outboxRepository';
import IOutboxJob from '../outboxJob';
import { fruitCreatedProducer } from './producersRegistry';

export default class OutboxJob implements IOutboxJob {
  private outboxRepository: IOutboxRepository;

  constructor(outboxRepository: IOutboxRepository) {
    this.outboxRepository = outboxRepository;
  }

  async execute(): Promise<void> {
    const pendingMessages = await this.outboxRepository.getPendingMessages();

    pendingMessages.forEach(async (message) => {
      switch (message.eventId) {
        case FRUIT_CREATED_EVENT_ID:
          fruitCreatedProducer.produce(message);
          break;
        default:
          throw new Error('Invalid Event');
      }

      await this.outboxRepository.markMessageAsPublished(message);
    });
  }
}
