import { inputObjectType } from 'nexus';

const CreateFruitInput = inputObjectType({
  name: 'CreateFruitInput',
  definition(t: any) {
    t.nonNull.string('name');
    t.nonNull.string('description');
  }
});

export default CreateFruitInput;
