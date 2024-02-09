// connexion à mongodb
const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/lukstopiaDB";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
export default mongodb;
