import { Result } from '../../../../shared/core/Result';
import { UseCaseError } from '../../../../shared/core/UseCaseError';

export namespace CreateFruitErrors {
  export class FruitAlreadyExistsError extends Result<UseCaseError> {
    constructor(name: string) {
      super(false, {
        message: `The fruit ${name} already exists`
      } as UseCaseError);
    }
  }
}
