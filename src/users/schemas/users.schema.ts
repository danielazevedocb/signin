import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  passsword: {
    type: String,
  },
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this['passsword'] = await bcrypt.hash(this['passsword'], 10);
  } catch (err) {
    return next(err);
  }
});
