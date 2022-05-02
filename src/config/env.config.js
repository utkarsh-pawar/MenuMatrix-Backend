import dotenv from 'dotenv';

dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
