import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

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
//

app.listen(PORT, () => {
  console.log(
    `Backend is running on port ${PORT}, view at http://localhost:${PORT}.`
  );
});
