import { Request, Response } from 'express';
import Booking from '../models/bookingModel';

// Create a new booking
export const createBooking = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bookings
export const getAllBookings = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const bookings = await Booking.find().populate('guestId roomId');
    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a booking by ID
export const getBookingById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      'guestId roomId'
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a booking by ID
export const updateBooking = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a booking by ID
export const deleteBooking = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
