import { beforeAll, afterEach, afterAll, describe, it, expect, jest } from '@jest/globals';
import { initDatabase, dropCollections, dropDatabase } from '../../../../../setupMongoMemoryServer';
import OutboxRepository from '../../../../../../src/shared/domain/outbox/repos/implementations/mongoose/outboxRepository';
import Models from '../../../../../../src/shared/infrastructure/database/mongoose/models';
import UniqueEntityID from '../../../../../../src/shared/domain/UniqueEntityID';

beforeAll(async () => {
  await initDatabase();
});

afterEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await dropDatabase();
});

describe('Mongoose OutboxRepository', () => {
  it('should add message to outbox table successfully', async () => {
    // Arrange
    const props = {
      eventId: 'TEST EVENT',
      status: 0,
      message: 'TEST MESSAGE',
      dateCreated: new Date()
    };

    const message: any = {
      id: new UniqueEntityID(),
      ...props,
      props: {
        ...props
      },
      equals: jest.fn((): boolean => true)
    };

    const outboxRepository = new OutboxRepository(Models);

    // Act
    await outboxRepository.addMessage(message);
    const pendingMessages = await outboxRepository.getPendingMessages();

    // Assert
    expect(pendingMessages.length).toBe(1);
  });

  it('should mark message as published successfully', async () => {
    // Arrange
    const props = {
      eventId: 'TEST EVENT',
      status: 0,
      message: 'TEST MESSAGE',
      dateCreated: new Date()
    };

    const message: any = {
      id: new UniqueEntityID(),
      ...props,
      props: {
        ...props
      },
      equals: jest.fn((): boolean => true)
    };

    const outboxRepository = new OutboxRepository(Models);

    await outboxRepository.addMessage(message);

    // Act
    await outboxRepository.markMessageAsPublished(message);
    const pendingMessages = await outboxRepository.getPendingMessages();

    // Assert
    expect(pendingMessages.length).toBe(0);
  });
});
