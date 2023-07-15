import OutboxMessage from '../outboxMessage';

export default interface IOutboxRepository {
  addMessage(message: OutboxMessage): Promise<void>;
  getPendingMessages(): Promise<OutboxMessage[]>;
  markMessageAsPublished(message: OutboxMessage): Promise<void>;
}
