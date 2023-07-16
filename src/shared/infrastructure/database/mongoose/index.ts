import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB Connection Error ${err}`);
});

mongoose.connection.on('connected', () => {
  console.info('Connected To DB');
});

interface IMongoConfig {
  uri: string | undefined;
  dbName: string | undefined;
  port: string | undefined;
}

let mongoDDConnection: mongoose.Connection;

export const connectDB = async (config: IMongoConfig) => {
  const dbUrl = `${config.uri}:${config.port}/${config.dbName}`;

  console.info(`Connecting to mongoDB: ${dbUrl}`);

  await mongoose.connect(dbUrl);
  mongoDDConnection = mongoose.connection;
};

export const getDBConnection = () => mongoDDConnection;
