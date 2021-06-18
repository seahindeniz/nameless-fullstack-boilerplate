import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { connectDB as mongooseConnect } from '../src/app';

let mongoServer: MongoMemoryServer;

export const connectDB = async (_uri?: string): Promise<void> => {
  let uri = _uri;

  if (!uri) {
    if (mongoServer) return undefined;

    mongoServer = await MongoMemoryServer.create();

    uri = mongoServer.getUri();
  }

  return mongooseConnect(uri);
};

export const closeDB = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

export const clearDBCollections = async (): Promise<void> => {
  const { collections } = mongoose.connection;

  await Promise.all(
    Object.values(collections).map(async collection =>
      collection.deleteMany({}),
    ),
  );
};
