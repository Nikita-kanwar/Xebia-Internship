const mongoose = require('mongoose');

const connectMongoDb = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => {
      console.error('Database connection failed:', error.message);
      process.exit(1);
    });
};

module.exports = { connectMongoDb };
