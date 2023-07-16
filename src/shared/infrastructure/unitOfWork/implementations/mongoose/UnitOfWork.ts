import { Connection, ClientSession } from 'mongoose';
import IOutboxRepository from '../../../../domain/outbox/repos/outboxRepository';
import IUnitOfWork from '../../IUnitOfWork';

export default class UnitOfWork implements IUnitOfWork {
  private session: ClientSession | undefined;

  readonly connection: Connection;

  readonly outboxRepository: IOutboxRepository;

  constructor(connection: Connection, outboxRepository: IOutboxRepository) {
    this.connection = connection;
    this.outboxRepository = outboxRepository;
  }

  getOutboxRepository(): IOutboxRepository {
    return this.outboxRepository;
  }

  getSession(): ClientSession | undefined {
    return this.session;
  }

  async startTransaction(): Promise<void> {
    this.session = await this.connection.startSession();
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
