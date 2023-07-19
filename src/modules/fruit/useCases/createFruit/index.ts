import fruitRepository from '../../repos/implementations';
import unitOfWork from '../../../../shared/infrastructure/unitOfWork/implementations';
import CreateFruitUseCase from './createFruitUseCase';

const createFruitUseCase = new CreateFruitUseCase(unitOfWork, fruitRepository);

export default createFruitUseCase;
