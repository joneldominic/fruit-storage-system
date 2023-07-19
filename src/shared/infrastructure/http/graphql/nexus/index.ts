import { makeSchema } from 'nexus';
import path from 'path';
import CreateFruitMutation from './fruit/createFruit/createFruitMutation';

const schema = makeSchema({
  types: [CreateFruitMutation],
  outputs: {
    schema: path.join(__dirname, 'generated', 'schema.graphql'),
    typegen: path.join(__dirname, 'generated', 'types.ts')
  },
  prettierConfig: `${__dirname}/../../../../../../.prettierrc`
});

export default schema;
