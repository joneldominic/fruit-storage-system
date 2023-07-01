import { AppError } from '../../../../shared/core/AppError';
import { UseCase } from '../../../../shared/core/UseCase';
import UniqueEntityID from '../../../../shared/domain/UniqueEntityID';
import FruitId from '../../domain/fruitId';
import FruitName from '../../domain/fruitName';
import FruitDescription from '../../domain/fruitDescription';
import IFruitRepository from '../../repos/fruitRepository';
import CreateFruitRequestDTO from './createFruitRequestDTO';
import { CreateFruitResponseDTO } from './createFruitResponseDTO';
import { Result, left, right } from '../../../../shared/core/Result';
import { CreateFruitErrors } from './createFruitErrors';
import Fruit from '../../domain/fruit';

export default class CreateFruitUseCase
  implements UseCase<CreateFruitRequestDTO, Promise<CreateFruitResponseDTO>>
{
  private fruitRepository: IFruitRepository;

  constructor(fruitRepository: IFruitRepository) {
    this.fruitRepository = fruitRepository;
  }

  async execute(request: CreateFruitRequestDTO): Promise<CreateFruitResponseDTO> {
    const fruitIdOrError = FruitId.create(new UniqueEntityID());
    const fruitNameOrError = FruitName.create({ value: request.name });
    const fruitDescriptionOrError = FruitDescription.create({ value: request.description });

    const dtoResult = Result.combine([fruitIdOrError, fruitNameOrError, fruitDescriptionOrError]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue())) as CreateFruitResponseDTO;
    }

    const fruitId: FruitId = fruitIdOrError.getValue();
    const fruitName: FruitName = fruitNameOrError.getValue();
    const fruitDescription: FruitDescription = fruitDescriptionOrError.getValue();

    try {
      const fruitAlreadyExists = await this.fruitRepository.exists(fruitName.value);

      if (fruitAlreadyExists) {
        return left(
          new CreateFruitErrors.FruitAlreadyExistsError(fruitName.value)
        ) as CreateFruitResponseDTO;
      }
      const fruitOrError = Fruit.create(
        {
          name: fruitName,
          description: fruitDescription
        },
        fruitId
      );

      if (fruitOrError.isFailure) {
        return left(
          Result.fail<Fruit>(fruitOrError.getErrorValue().toString())
        ) as CreateFruitResponseDTO;
      }

      const fruit = fruitOrError.getValue();

      await this.fruitRepository.save(fruit);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as CreateFruitResponseDTO;
    }
  }
}
