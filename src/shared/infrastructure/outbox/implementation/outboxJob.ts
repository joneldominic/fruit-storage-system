import IOutboxRepository from '../../../domain/outbox/repos/outboxRepository';
import IOutboxJob from '../outboxJob';

export default class OutboxJob implements IOutboxJob {
  private outboxRepository: IOutboxRepository;

  constructor(outboxRepository: IOutboxRepository) {
    this.outboxRepository = outboxRepository;
  }

  async execute(): Promise<void> {
    const pendingMessages = await this.outboxRepository.getPendingMessages();
    console.info('👨‍💻 Joneeeeel ~ file: outboxJob.ts:14 ~ pendingMessages:', pendingMessages);
  }
}
