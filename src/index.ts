import { ApolloServer } from 'apollo-server-express';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import schema from './graphql/schema';

dotenv.config();
const port: string | undefined = process.env.PORT;

const app: Express = express();

const startServer: any = async () => {
  const apollo: ApolloServer = new ApolloServer({ schema });
  await apollo.start();
  apollo.applyMiddleware({ app });
};
startServer();

app.get('/', (req: Request, res: Response) => {
  res.redirect('/graphql');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
