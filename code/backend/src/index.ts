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

const PORT = 5000;
const MONGO_URI =
  'mongodb+srv://muhammadmohsinkhanaptech:5KYCk507Xm3ZsGYk@cluster0.6nbiqrm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
//

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/housekeeping', housekeepingRoutes);
app.use('/api/system-settings', systemSettingsRoutes);

app.listen(PORT, () => {
  console.log(
    `Backend is running on port ${PORT}, view at http://localhost:${PORT}.`
  );
});
