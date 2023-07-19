import { nonNull, mutationType } from 'nexus';
import createFruitResolver from '../../../resolvers/fruit/createFruitResolver';
import CreateFruitResponse from './createFruitResponse';
import CreateFruitInput from './createFruitInputs';

const CreateFruitMutation = mutationType({
  definition(t: any) {
    t.field('CreateFruitMutation', {
      type: CreateFruitResponse,
      args: {
        input: nonNull(CreateFruitInput)
      },
      resolve: (_: any, args: any) => createFruitResolver(args.input)
    });
  }
});

export default CreateFruitMutation;
