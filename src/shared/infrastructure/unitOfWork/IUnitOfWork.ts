import IOutboxRepository from '../../domain/outbox/repos/outboxRepository';

export default interface IUnitOfWork {
  readonly outboxRepository: IOutboxRepository;
  readonly connectionGetter: () => any;
  getOutboxRepository(): IOutboxRepository;
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  abortTransaction(): Promise<void>;
  closeTransaction(): Promise<void>;
}
