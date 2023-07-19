import { AppError } from '../../../../shared/core/AppError';
import { Either, Result } from '../../../../shared/core/Result';
import Fruit from '../../domain/fruit';
import { CreateFruitErrors } from './createFruitErrors';

export type CreateFruitResponseDTO = Either<
  CreateFruitErrors.FruitAlreadyExistsError | AppError.UnexpectedError | Result<any>,
  Result<Fruit>
>;
