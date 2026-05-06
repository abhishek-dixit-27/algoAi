const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas Database
 * Uses MONGO_URI from environment variables
 * If connection fails, app will continue with mock database
 */
const connectDB = async () => {
  // If using mock database (localhost), skip MongoDB connection
  if (process.env.MONGO_URI && process.env.MONGO_URI.includes('localhost')) {
    console.log('✓ Using local mock database (no MongoDB required)');
    return;
  }

  let retries = 5;
  while (retries > 0) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        bufferCommands: false,
      });

      console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      retries--;
      console.error(`✗ MongoDB Connection Error (Retry ${6 - retries}/5): ${error.message}`);
      
      if (retries > 0) {
        console.log(`⏳ Retrying in 2 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        console.error('✗ Failed to connect to MongoDB after 5 retries');
        console.log('✓ Using mock in-memory database instead');
      }
    }
  }
};

module.exports = connectDB;
