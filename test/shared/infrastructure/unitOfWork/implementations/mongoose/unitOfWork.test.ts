import { beforeAll, afterEach, afterAll, describe, it, expect, jest } from '@jest/globals';
import {
  initDatabase,
  dropCollections,
  dropDatabase,
  getDBConnection
} from '../../../../../setupMongoMemoryServer';
import OutboxMessage from '../../../../../../src/shared/domain/outbox/outboxMessage';
import IOutboxRepository from '../../../../../../src/shared/domain/outbox/repos/outboxRepository';
import UnitWork from '../../../../../../src/shared/infrastructure/unitOfWork/implementations/mongoose/UnitOfWork';

beforeAll(async () => {
  await initDatabase();
});

afterEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await dropDatabase();
});

describe('Mongoose UnitOfWork', () => {
  it('should be able to get OutboxRepository successfully', async () => {
    // Arrange
    const fakeOutboxRepository: IOutboxRepository = {
      addMessage: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      }),
      getPendingMessages: jest.fn(async (): Promise<OutboxMessage[]> => []),
      markMessageAsPublished: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      })
    };

    const mongoDBMemoryConnection = getDBConnection();

    const unitWork = new UnitWork(mongoDBMemoryConnection, fakeOutboxRepository);

    // Act
    const outboxRepository = unitWork.getOutboxRepository();

    // Assert
    expect(outboxRepository).toBeDefined();
    expect(outboxRepository.addMessage).toBeDefined();
    expect(outboxRepository.getPendingMessages).toBeDefined();
    expect(outboxRepository.markMessageAsPublished).toBeDefined();
  });

  it('should start a transaction successfully', async () => {
    // Arrange
    const fakeOutboxRepository: IOutboxRepository = {
      addMessage: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      }),
      getPendingMessages: jest.fn(async (): Promise<OutboxMessage[]> => []),
      markMessageAsPublished: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      })
    };

    const mongoDBMemoryConnection = getDBConnection();

    const unitWork = new UnitWork(mongoDBMemoryConnection, fakeOutboxRepository);

    // Act
    await unitWork.startTransaction();

    // Assert
    const session = unitWork.getSession();
    expect(session?.inTransaction()).toBe(true);
  });

  it('should close a transaction successfully', async () => {
    // Arrange
    const fakeOutboxRepository: IOutboxRepository = {
      addMessage: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      }),
      getPendingMessages: jest.fn(async (): Promise<OutboxMessage[]> => []),
      markMessageAsPublished: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      })
    };

    const mongoDBMemoryConnection = getDBConnection();

    const unitWork = new UnitWork(mongoDBMemoryConnection, fakeOutboxRepository);

    // Act
    await unitWork.startTransaction();
    await unitWork.abortTransaction();

    // Assert
    const session = unitWork.getSession();
    expect(session?.inTransaction()).toBe(false);
  });

  it('should close a transaction successfully', async () => {
    // Arrange
    const fakeOutboxRepository: IOutboxRepository = {
      addMessage: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      }),
      getPendingMessages: jest.fn(async (): Promise<OutboxMessage[]> => []),
      markMessageAsPublished: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      })
    };

    const mongoDBMemoryConnection = getDBConnection();

    const unitWork = new UnitWork(mongoDBMemoryConnection, fakeOutboxRepository);

    // Act
    await unitWork.startTransaction();
    await unitWork.commitTransaction();
    await unitWork.closeTransaction();

    // Assert
    const session = unitWork.getSession();
    expect(session?.inTransaction()).toBe(false);
  });
});
