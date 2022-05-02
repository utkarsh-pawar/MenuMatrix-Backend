import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    contact_no: {
      type: Number,
    },
    otp: {
      type: Number,
    },
    token: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'verified'],
      default: 'pending',
    },
    role: {
      type: String,
      enum: ['RESTAURANT'],
      default: 'RESTAURANT',
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model('restaurant', restaurantSchema);
export default Restaurant;
