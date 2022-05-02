import mongoose from 'mongoose';
import config from '../config/env.config';

const database = () => {
  mongoose
    .connect(config.MONGO_URI!)
    .then(() => {
      console.log('connected to database');
    })
    .catch(() => {
      console.log('something went wrong');
      process.exit();
    });
};

export default database;
