import { describe, it, expect, jest } from '@jest/globals';
import IFruitRepository from '../../../../../src/modules/fruit/repos/fruitRepository';
import CreateFruitUseCase from '../../../../../src/modules/fruit/useCases/createFruit/createFruitUseCase';
import IOutboxRepository from '../../../../../src/shared/domain/outbox/repos/outboxRepository';
import IUnitOfWork from '../../../../../src/shared/infrastructure/unitOfWork/IUnitOfWork';
import OutboxMessage from '../../../../../src/shared/domain/outbox/outboxMessage';

describe('Create Fruit Use Case', () => {
  it('should execute successfully', async () => {
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

    const fakeUnitOfWork: IUnitOfWork = {
      connectionGetter: () => 'DUMMY_CONNECTION',
      outboxRepository: fakeOutboxRepository,
      getOutboxRepository: jest.fn((): IOutboxRepository => fakeOutboxRepository),
      startTransaction: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      }),
      commitTransaction: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      }),
      abortTransaction: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      }),
      closeTransaction: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      })
    };

    const fakeFruitRepository: IFruitRepository = {
      exists: jest.fn(async (): Promise<boolean> => false),
      save: jest.fn(async (): Promise<void> => undefined)
    };

    const createFruitUseCase = new CreateFruitUseCase(fakeUnitOfWork, fakeFruitRepository);

    // Act
    const result = await createFruitUseCase.execute({
      name: 'lemon',
      description: 'this is a lemon'
    });

    // Assert
    expect(result.isRight()).toBeTruthy();
    expect(result.value.getValue()).toBeTruthy();
    expect(fakeFruitRepository.exists).toHaveBeenCalled();
    expect(fakeFruitRepository.save).toHaveBeenCalled();
    expect(fakeUnitOfWork.startTransaction).toHaveBeenCalled();
    expect(fakeUnitOfWork.commitTransaction).toHaveBeenCalled();
    expect(fakeUnitOfWork.abortTransaction).not.toHaveBeenCalled();
    expect(fakeUnitOfWork.closeTransaction).toHaveBeenCalled();
  });

  it('should fail when fruit already exists', async () => {
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

    const fakeUnitOfWork: IUnitOfWork = {
      connectionGetter: () => 'DUMMY_CONNECTION',
      outboxRepository: fakeOutboxRepository,
      getOutboxRepository: jest.fn((): IOutboxRepository => fakeOutboxRepository),
      startTransaction: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      }),
      commitTransaction: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      }),
      abortTransaction: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      }),
      closeTransaction: jest.fn(async (): Promise<void> => {
        // eslint-disable-line @typescript-eslint/no-empty-function
      })
    };

    const fakeFruitRepository: IFruitRepository = {
      exists: jest.fn(async (): Promise<boolean> => true),
      save: jest.fn(async (): Promise<void> => undefined)
    };

    const createFruitUseCase = new CreateFruitUseCase(fakeUnitOfWork, fakeFruitRepository);

    // Act
    const result = await createFruitUseCase.execute({
      name: 'lemon',
      description: 'this is a lemon'
    });

    // Assert
    expect(result.isLeft()).toBeTruthy();
    expect(fakeFruitRepository.exists).toHaveBeenCalled();
    expect(fakeFruitRepository.save).not.toHaveBeenCalled();
    expect(fakeUnitOfWork.startTransaction).toHaveBeenCalled();
    expect(fakeUnitOfWork.commitTransaction).not.toHaveBeenCalled();
    expect(fakeUnitOfWork.abortTransaction).not.toHaveBeenCalled();
    expect(fakeUnitOfWork.closeTransaction).toHaveBeenCalled();
  });
});
