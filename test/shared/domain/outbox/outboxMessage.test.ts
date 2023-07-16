import { describe, it, expect } from '@jest/globals';
import UniqueEntityID from '../../../../src/shared/domain/UniqueEntityID';
import OutboxMessage from '../../../../src/shared/domain/outbox/outboxMessage';

describe('OutboxMessage ', () => {
  it('should be able to create OutboxMessage successfully', async () => {
    // Arrange
    const outboxMessageUniqueID = new UniqueEntityID();
    const outboxMessage = {
      event: 'TEST EVENT',
      status: 0,
      message: 'TEST MESSAGE',
      dateCreated: new Date()
    };

    // Act
    const outboxMessageOrError = OutboxMessage.create(outboxMessage, outboxMessageUniqueID);

    // Assert
    expect(outboxMessageOrError.isSuccess).toBeTruthy();
    expect(outboxMessageOrError.getValue().id).toBe(outboxMessageUniqueID);
    expect(outboxMessageOrError.getValue().event).toBe(outboxMessage.event);
    expect(outboxMessageOrError.getValue().status).toBe(outboxMessage.status);
    expect(outboxMessageOrError.getValue().message).toBe(outboxMessage.message);
    expect(outboxMessageOrError.getValue().dateCreated).toBe(outboxMessage.dateCreated);
  });

  it('should fail creating OutboxMessage when some props is null or undefined', async () => {
    // Arrange
    const outboxMessageUniqueID = new UniqueEntityID();
    const outboxMessage = {
      event: 'TEST EVENT',
      status: 0,
      message: null,
      dateCreated: new Date()
    };

    // Act
    const outboxMessageOrError = OutboxMessage.create(outboxMessage, outboxMessageUniqueID);

    // Assert
    expect(outboxMessageOrError.isFailure).toBeTruthy();
  });
});
