import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  reservationDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['reserved', 'checked-in', 'checked-out', 'cancelled'],
    required: true,
  },
  confirmationDetails: { type: String },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
