import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error(`MongoDB Connection Error ${err}`);
});

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.info('Connected To DB');
});

interface IMongoConfig {
  uri: string | undefined;
  dbName: string | undefined;
  port: string | undefined;
}

// eslint-disable-next-line import/prefer-default-export
export const connectDB = (config: IMongoConfig) => {
  const dbUrl = `${config.uri}:${config.port}/${config.dbName}`;
  mongoose.connect(dbUrl);
};
