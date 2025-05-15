
import mongoose from 'mongoose';

export const connectDB = async () => {
    const dbURI = process.env.DB_URI as string;
    if(dbURI === undefined) {
        console.error('MongoDB URI is not defined in the environment variables');
    }
  try {
    const conn = await mongoose.connect(dbURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Unable to connect to the db: ${error}`);
    process.exit(1);
  }
};