import dotenv from 'dotenv';
import mongoose from 'mongoose';

export const connectToDb = async () => {
  dotenv.config();
  mongoose.connection.on('error', (err: mongoose.MongooseError) => console.log(err));
  mongoose.connection.once('connected', () => console.log('Connection successful'));
  await mongoose.connect(process.env.DEV_DB_CONN_STRING);
};
