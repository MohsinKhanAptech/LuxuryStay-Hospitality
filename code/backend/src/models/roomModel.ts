import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomType: { type: String, required: true },
    availability: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ['cleaning', 'occupied', 'available', 'maintenance'],
      required: true,
    },
    pricing: { type: Number, required: true },
    amenities: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', roomSchema);

export default Room;
