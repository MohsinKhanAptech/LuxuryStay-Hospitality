import mongoose from 'mongoose';

const housekeepingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    task: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'in progress', 'completed'],
      required: true,
    },
    scheduledDate: { type: Date, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Housekeeping = mongoose.model('Housekeeping', housekeepingSchema);

export default Housekeeping;
