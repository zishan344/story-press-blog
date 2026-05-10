import mongoose from 'mongoose';
import { env } from './env';
// dns.setServers(['8.8.8.8', '1.1.1.1']);
export const connectDB = async () => {
  mongoose.set('strictQuery', true);
  try {
    const connection = await mongoose.connect(env.DATABASE_URL);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error: any) {
    console.log('Database crash ' + error);
  }
};
