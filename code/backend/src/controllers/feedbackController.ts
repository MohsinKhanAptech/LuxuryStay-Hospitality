import { Request, Response } from 'express';
import Feedback from '../models/feedbackModel';

// Create feedback
export const createFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all feedback
export const getAllFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const feedbacks = await Feedback.find().populate('guestId');
    res.status(200).json(feedbacks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by ID
export const getFeedbackById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('guestId');
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update feedback
export const updateFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete feedback
export const deleteFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
