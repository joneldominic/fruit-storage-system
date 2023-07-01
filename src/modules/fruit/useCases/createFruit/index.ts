import fruitRepository from '../../repos/implementations';
import CreateFruitUseCase from './createFruitUseCase';

const createFruitUseCase = new CreateFruitUseCase(fruitRepository);

export default { createFruitUseCase };
