const mongoose = require('mongoose');

const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || '37017';
const dbName = process.env.MONGO_DB_NAME || 'uncat';

const mongoURI = `mongodb://${mongoHost}:${mongoPort}/${dbName}`;


async function connectWithRetry() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
}

connectWithRetry();