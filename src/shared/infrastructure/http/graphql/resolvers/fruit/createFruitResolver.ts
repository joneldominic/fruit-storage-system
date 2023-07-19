import FruitMapper from '../../../../../../modules/fruit/mappers/fruitMapper';
import CreateFruitRequestDTO from '../../../../../../modules/fruit/useCases/createFruit/createFruitRequestDTO';
import createFruitUseCase from '../../../../../../modules/fruit/useCases/createFruit/index';

const createFruitResolver = async (args: CreateFruitRequestDTO) => {
  const result = await createFruitUseCase.execute(args);

  if (result.isRight()) {
    const fruit = result.value.getValue();

    return {
      ...FruitMapper.toDTO(fruit)
    };
  }

  throw result.value;
};

export default createFruitResolver;
