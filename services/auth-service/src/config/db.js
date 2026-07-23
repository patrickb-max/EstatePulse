const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[Auth Service] Connected to MongoDB Atlas: ${conn.connection.host}`);
  } catch (err) {
    console.error(`[Auth Service] DB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; // <--- MUST BE DIRECT EXPORT (not { connectDB })