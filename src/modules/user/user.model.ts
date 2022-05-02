import mongoose from 'mongoose';
import validator from 'validator';
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
    },
    contact_no: {
      type: Number,
    },
    token: {
      type: String,
    },
    otp: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'verified'],
      default: 'pending',
    },
    role: {
      type: String,
      enum: ['USER'],
      default: 'USER',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('user', userSchema);

export default User;
