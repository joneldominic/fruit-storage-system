import { describe, it, expect, jest } from '@jest/globals';
import IFruitRepository from '../../../../../src/modules/fruit/repos/fruitRepository';
import CreateFruitUseCase from '../../../../../src/modules/fruit/useCases/createFruit/createFruitUseCase';

describe('Create Fruit Use Case', () => {
  it('should execute successfully', async () => {
    // Arrange
    const fakeFruitRepository: IFruitRepository = {
      exists: jest.fn(async (): Promise<boolean> => false),
      save: jest.fn(async (): Promise<void> => undefined)
    };
    const createFruitUseCase = new CreateFruitUseCase(fakeFruitRepository);

    // Act
    const result = await createFruitUseCase.execute({
      name: 'lemon',
      description: 'this is a lemon'
    });

    // Assert
    expect(result.isRight()).toBeTruthy();
    expect(fakeFruitRepository.exists).toHaveBeenCalled();
    expect(fakeFruitRepository.save).toHaveBeenCalled();
  });

  it('should fail when fruit already exists', async () => {
    // Arrange
    const fakeFruitRepository: IFruitRepository = {
      exists: jest.fn(async (): Promise<boolean> => true),
      save: jest.fn(async (): Promise<void> => undefined)
    };
    const createFruitUseCase = new CreateFruitUseCase(fakeFruitRepository);

    // Act
    const result = await createFruitUseCase.execute({
      name: 'lemon',
      description: 'this is a lemon'
    });

    // Assert
    expect(result.isLeft()).toBeTruthy();
    expect(fakeFruitRepository.exists).toHaveBeenCalled();
    expect(fakeFruitRepository.save).not.toHaveBeenCalled();
  });
});
