import mongoose from 'mongoose';

import { CONFIGS } from './';

async function connectToMongoDb(
  dbName: string = CONFIGS.DB.NAME,
): Promise<void> {
  const authOptions: {
    auth?: {
      username: string;
      password: string;
    };
  } = {};

  if (CONFIGS.DB.USER && CONFIGS.DB.PASSWORD) {
    authOptions.auth = {
      username: CONFIGS.DB.USER as string,
      password: CONFIGS.DB.PASSWORD as string,
    };
  }
  const mongoUri = `mongodb://${CONFIGS.DB.HOST}:${CONFIGS.DB.PORT}/?serverSelectionTimeoutMS=3000&directConnection=true`;
  await mongoose.connect(mongoUri, {
    dbName,
    serverSelectionTimeoutMS: 3000,
    ...authOptions,
  });
}

export default connectToMongoDb;
