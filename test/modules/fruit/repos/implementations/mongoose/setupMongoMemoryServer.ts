import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: any;

export const initDatabase = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
};

export const dropCollections = async () => {
  if (!mongo) throw new Error('Error dropping collections');

  const { collections } = mongoose.connection;

  const actions: any = [];
  // eslint-disable-next-line no-loops/no-loops, no-restricted-syntax, guard-for-in
  for (const key in collections) {
    const collection = collections[key];
    actions.push(collection.deleteMany());
  }

  await Promise.all(actions);
};

export const dropDatabase = async () => {
  if (!mongo) throw new Error('Error dropping database');

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();

  await mongo.stop();
};
