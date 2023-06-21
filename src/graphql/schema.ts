import {
  makeSchema,
  queryType,
  objectType,
  stringArg,
  extendType,
  nonNull,
  intArg,
  booleanArg,
  inputObjectType
} from 'nexus';
import path from 'path';
import {
  storeFruitToFruitStorageResolver,
  createFruitForFruitStorageResolver,
  updateFruitForFruitStorageResolver
} from './resolver';

const Fruit = objectType({
  name: 'Fruit',
  definition(t: any) {
    t.id('id');
    t.string('name');
    t.string('description');
  }
});

const FruitStorage = objectType({
  name: 'FruitStorage',
  definition(t: any) {
    t.id('id');
    t.string('fruitId');
    t.int('limit');
    t.int('count');
  }
});

const FruitStorageWithFruit = objectType({
  name: 'FruitStorageWithFruit',
  definition(t: any) {
    t.id('id');
    t.field('fruit', { type: 'Fruit' });
    t.int('limit');
    t.int('count');
  }
});

const Query = queryType({
  definition(t: any) {
    t.field('findFruit', {
      type: 'Fruit',
      args: { name: stringArg() },
      resolve: (_: any, args: any) => ({
        id: 1,
        name: args.name,
        description: 'test'
      })
    });
  }
});

const StoreFruitInput = inputObjectType({
  name: 'StoreFruitInput',
  definition(t: any) {
    t.nonNull.string('name');
    t.nonNull.int('amount');
  }
});

const CreateFruitInput = inputObjectType({
  name: 'CreateFruitInput',
  definition(t: any) {
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nonNull.int('limit');
  }
});

const UpdateFruitInput = inputObjectType({
  name: 'UpdateFruitInput',
  definition(t: any) {
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.int('limit');
  }
});

const Mutation = extendType({
  type: 'Mutation',
  definition(t: any) {
    t.field('storeFruitToFruitStorage', {
      type: 'FruitStorageWithFruit',
      args: {
        input: nonNull(StoreFruitInput)
      },
      resolve: async (_: any, args: any) => storeFruitToFruitStorageResolver(args.input)
    });
    t.field('removeFruitFromFruitStorage', {
      type: 'FruitStorage',
      args: {
        name: nonNull(stringArg()),
        amount: nonNull(intArg())
      },
      resolve: (_: any, args: any) => ({
        name: args.name
      })
    });
    t.field('createFruitForFruitStorage', {
      type: 'FruitStorageWithFruit',
      args: {
        input: nonNull(CreateFruitInput)
      },
      resolve: (_: any, args: any) => createFruitForFruitStorageResolver(args.input)
    });
    t.field('updateFruitForFruitStorage', {
      type: 'FruitStorageWithFruit',
      args: {
        input: nonNull(UpdateFruitInput)
      },
      resolve: (_: any, args: any) => updateFruitForFruitStorageResolver(args.input)
    });
    t.field('deleteFruitFromFruitStorage', {
      type: 'FruitStorage',
      args: {
        name: nonNull(stringArg()),
        forceDelete: nonNull(booleanArg())
      },
      resolve: (_: any, args: any) => ({
        name: args.name
      })
    });
  }
});

const schema = makeSchema({
  types: [Fruit, FruitStorage, FruitStorageWithFruit, Query, Mutation],
  outputs: {
    schema: path.join(__dirname, 'generated', 'schema.graphql'),
    typegen: path.join(__dirname, 'generated', 'types.ts')
  },
  prettierConfig: `${__dirname}/../../.prettierrc`
});

export default schema;
