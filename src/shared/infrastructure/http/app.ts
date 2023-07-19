import { ApolloServer } from 'apollo-server-express';
import express, { Response } from 'express';
import dotenv from 'dotenv';
import schema from './graphql/nexus';
import { connectDB } from '../database/mongoose';

dotenv.config();

const appPort = process.env.PORT;
const mongoDBUri = process.env.MONGODB_URI;
const mongoDBPort = process.env.MONGODB_PORT;
const mongoDBName = process.env.MONGODB_NAME;

const app = express();

const startApp = async () => {
  const apollo = new ApolloServer({ schema });
  await apollo.start();
  apollo.applyMiddleware({ app });

  await connectDB({ uri: mongoDBUri, port: mongoDBPort, dbName: mongoDBName });

  app.get('/', (_, res: Response) => {
    res.redirect('/graphql');
  });

  app.listen(appPort, () => {
    console.info(`⚡️[server]: Server is running at http://localhost:${appPort}`);
  });
};

export default { start: startApp };
