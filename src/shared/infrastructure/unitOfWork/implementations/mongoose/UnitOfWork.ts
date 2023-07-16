import { Connection, ClientSession } from 'mongoose';
import IOutboxRepository from '../../../../domain/outbox/repos/outboxRepository';
import IUnitOfWork from '../../IUnitOfWork';

export default class UnitOfWork implements IUnitOfWork {
  private session: ClientSession | undefined;

  readonly outboxRepository: IOutboxRepository;

  readonly connectionGetter: () => Connection;

  constructor(connectionGetter: () => Connection, outboxRepository: IOutboxRepository) {
    this.connectionGetter = connectionGetter;
    this.outboxRepository = outboxRepository;
  }

  getOutboxRepository(): IOutboxRepository {
    return this.outboxRepository;
  }

  getSession(): ClientSession | undefined {
    return this.session;
  }

  async startTransaction(): Promise<void> {
    this.session = await this.connectionGetter().startSession();
    this.session.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    await this.session?.commitTransaction();
  }

  async abortTransaction(): Promise<void> {
    await this.session?.abortTransaction();
  }

  async closeTransaction(): Promise<void> {
    this.session?.endSession();
  }
}
