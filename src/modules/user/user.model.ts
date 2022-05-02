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
      validate(value: string) {},
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
    profile_image: {
      type: String,
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
