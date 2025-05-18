import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  requestDetails: { type: String, required: true },
  status: {
    type: String,
    enum: ['reported', 'assigned', 'in progress', 'completed'],
    required: true,
  },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

export default Maintenance;
