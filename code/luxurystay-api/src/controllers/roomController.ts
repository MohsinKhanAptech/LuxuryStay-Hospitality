import { Request, Response } from 'express';
import Room from '../models/roomModel';

// Create a new room
export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all rooms
export const getAllRooms = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a room by ID
export const getRoomById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a room by ID
export const updateRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a room by ID
export const deleteRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
