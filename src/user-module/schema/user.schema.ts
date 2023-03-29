import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  address: String,
  description: String,
  create_At: { type: Date, default: Date.now() },
});
