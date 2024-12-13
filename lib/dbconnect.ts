import mongoose from 'mongoose';

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Connection failed!');
  }
}

export default dbConnect;
