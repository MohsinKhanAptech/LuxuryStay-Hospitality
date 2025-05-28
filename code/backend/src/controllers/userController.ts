import { Request, Response } from 'express';
import User from '../models/userModel';

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve all users
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a user by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
