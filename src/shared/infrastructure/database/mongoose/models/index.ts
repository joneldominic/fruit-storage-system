import Fruit from './Fruit';

export type MongooseModels = {
  Fruit: typeof Fruit;
};

const Models: MongooseModels = {
  Fruit
};

export default Models;
