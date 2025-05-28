import { Application, Request, Response } from 'express';
import Bill from '../models/billModel';

// Create a new bill
export const createBill = async (req: Request, res: Response): Promise<any> => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bills
export const getAllBills = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const bills = await Bill.find().populate('bookingId');
    res.status(200).json(bills);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a bill by ID
export const getBillById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const bill = await Bill.findById(req.params.id).populate('bookingId');
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(200).json(bill);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bill by ID
export const updateBill = async (req: Request, res: Response): Promise<any> => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(200).json(bill);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bill by ID
export const deleteBill = async (req: Request, res: Response): Promise<any> => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
