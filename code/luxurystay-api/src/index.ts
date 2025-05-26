import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import roomRoutes from './routes/roomRoutes';
import userRoutes from './routes/userRoutes';
import billRoutes from './routes/billRoutes';
import bookingRoutes from './routes/bookingRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import maintenanceRoutes from './routes/maintenanceRoutes';
import housekeepingRoutes from './routes/housekeepingRoutes';
import systemSettingsRoutes from './routes/systemSettingsRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/LuxuryStarHospitality';

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use('/api/bills', billRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/housekeeping', housekeepingRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/system-settings', systemSettingsRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(
    `Backend is running on port ${PORT}, view at http://localhost:${PORT}.`
  );
});
