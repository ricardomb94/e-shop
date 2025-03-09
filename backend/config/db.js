import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined')
    }
    
    // Modern mongoose.connect() no longer needs the deprecated options
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    // Improved error handling with specific messages for different error types
    if (error.name === 'MongoParseError') {
      console.error(`Invalid MongoDB URI format: ${error.message}`.red.underline.bold);
    } else if (error.name === 'MongoServerSelectionError') {
      console.error(`Could not connect to MongoDB server: ${error.message}`.red.underline.bold);
    } else {
      console.error(`MongoDB connection error: ${error.message}`.red.underline.bold);
    }
    process.exit(1);
  }
};

export default connectDB;
