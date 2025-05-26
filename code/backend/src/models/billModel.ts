import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    charges: {
      roomRate: { type: Number },
      services: { type: Number },
      taxes: { type: Number },
    },
    paymentStatus: { type: String, enum: ['paid', 'pending'], required: true },
    invoice: {
      invoiceNumber: { type: String },
      issueDate: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model('Bill', billSchema);

export default Bill;
