import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const Menu = mongoose.model('menu', menuSchema);
export default Menu;
