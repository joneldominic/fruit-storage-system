import IOutboxRepository from '../../domain/outbox/repos/outboxRepository';

export default interface IUnitOfWork {
  readonly connection: any;
  readonly outboxRepository: IOutboxRepository;
  getOutboxRepository(): IOutboxRepository;
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  abortTransaction(): Promise<void>;
  closeTransaction(): Promise<void>;
}
