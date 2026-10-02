const mongoose = require('mongoose');

async function connectDB(uri = process.env.MONGODB_URI) {
  if (!uri) throw new Error('MONGODB_URI is not configured. Copy .env.example to .env.');
  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}

module.exports = connectDB;
