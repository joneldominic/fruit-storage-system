import { objectType } from 'nexus';

const CreateFruitResponse = objectType({
  name: 'CreateFruitResponse',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('description');
  }
});

export default CreateFruitResponse;
