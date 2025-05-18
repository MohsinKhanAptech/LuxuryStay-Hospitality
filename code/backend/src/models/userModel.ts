import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ['admin', 'manager', 'receptionist', 'housekeeping', 'guest'],
    required: true,
  },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },
  },
  password: { type: String, required: true },
  accessLevel: { type: Number },
  isActive: { type: Boolean, default: true },
  preferences: {
    roomType: { type: String },
    smoking: { type: Boolean },
  },
});

const User = mongoose.model('User', userSchema);

export default User;
