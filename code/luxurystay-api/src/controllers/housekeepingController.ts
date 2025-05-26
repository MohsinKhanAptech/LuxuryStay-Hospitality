import { Request, Response } from 'express';
import Housekeeping from '../models/housekeepingModel';

// Create a new housekeeping task
export const createHousekeepingTask = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const task = new Housekeeping(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve all housekeeping tasks
export const getAllHousekeepingTasks = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const tasks = await Housekeeping.find()
      .populate('roomId')
      .populate('assignedTo');
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a specific housekeeping task by ID
export const getHousekeepingTaskById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const task = await Housekeeping.findById(req.params.id)
      .populate('roomId')
      .populate('assignedTo');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a housekeeping task by ID
export const updateHousekeepingTask = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const task = await Housekeeping.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a housekeeping task by ID
export const deleteHousekeepingTask = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const task = await Housekeeping.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
