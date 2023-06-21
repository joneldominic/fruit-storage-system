import {
  makeSchema,
  queryType,
  objectType,
  stringArg,
  extendType,
  nonNull,
  booleanArg,
  inputObjectType
} from 'nexus';
import path from 'path';
import {
  findFruitResolver,
  storeFruitToFruitStorageResolver,
  createFruitForFruitStorageResolver,
  updateFruitForFruitStorageResolver,
  removeFruitFromFruitStorageResolver
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

const StoreRemoveFruitInput = inputObjectType({
  name: 'StoreRemoveFruitInput',
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

const Query = queryType({
  definition(t: any) {
    t.field('findFruit', {
      type: 'FruitStorageWithFruit',
      args: {
        name: nonNull(stringArg())
      },
      resolve: (_: any, args: any) => findFruitResolver(args)
    });
  }
});

const Mutation = extendType({
  type: 'Mutation',
  definition(t: any) {
    t.field('storeFruitToFruitStorage', {
      type: 'FruitStorageWithFruit',
      args: {
        input: nonNull(StoreRemoveFruitInput)
      },
      resolve: async (_: any, args: any) => storeFruitToFruitStorageResolver(args.input)
    });
    t.field('removeFruitFromFruitStorage', {
      type: 'FruitStorageWithFruit',
      args: {
        input: nonNull(StoreRemoveFruitInput)
      },
      resolve: (_: any, args: any) => removeFruitFromFruitStorageResolver(args.input)
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
