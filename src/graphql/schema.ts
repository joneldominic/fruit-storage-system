import {
  makeSchema,
  queryType,
  objectType,
  stringArg,
  extendType,
  nonNull,
  intArg,
  booleanArg
} from 'nexus';

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

const Mutation = extendType({
  type: 'Mutation',
  definition(t: any) {
    t.field('storeFruitToFruitStorage', {
      type: 'FruitStorage',
      args: {
        name: nonNull(stringArg()),
        amount: nonNull(intArg())
      },
      resolve: (_: any, args: any) => ({
        name: args.name
      })
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
      type: 'FruitStorage',
      args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        limit: nonNull(intArg())
      },
      resolve: (_: any, args: any) => ({
        name: args.name
      })
    });
    t.field('updateFruitForFruitStorage', {
      type: 'FruitStorage',
      args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        limit: nonNull(intArg())
      },
      resolve: (_: any, args: any) => ({
        name: args.name
      })
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

const schema: any = makeSchema({
  types: [Fruit, Query, FruitStorage, Mutation],
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/types.ts`
  },
  prettierConfig: `${__dirname}/../../.prettierrc`
});

export default schema;
