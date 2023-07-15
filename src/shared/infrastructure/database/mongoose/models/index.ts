import Fruit from './Fruit';
import OutboxMessage from './OutboxMessage';

export type MongooseModels = {
  Fruit: typeof Fruit;
  OutboxMessage: typeof OutboxMessage;
};

const Models: MongooseModels = {
  Fruit,
  OutboxMessage
};

export default Models;
