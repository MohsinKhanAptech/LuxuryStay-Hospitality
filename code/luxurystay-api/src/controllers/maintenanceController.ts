import { Request, Response } from 'express';
import Maintenance from '../models/maintenanceModel';

// Create a new maintenance request
export const createMaintenanceRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const maintenanceRequest = new Maintenance(req.body);
    await maintenanceRequest.save();
    res.status(201).json(maintenanceRequest);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve all maintenance requests
export const getAllMaintenanceRequests = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const maintenanceRequests = await Maintenance.find()
      .populate('roomId')
      .populate('reportedBy')
      .populate('assignedTo');
    res.status(200).json(maintenanceRequests);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a specific maintenance request by ID
export const getMaintenanceRequestById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const maintenanceRequest = await Maintenance.findById(req.params.id)
      .populate('roomId')
      .populate('reportedBy')
      .populate('assignedTo');
    if (!maintenanceRequest) {
      return res.status(404).json({ message: 'Maintenance request not found' });
    }
    res.status(200).json(maintenanceRequest);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a maintenance request
export const updateMaintenanceRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const maintenanceRequest = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!maintenanceRequest) {
      return res.status(404).json({ message: 'Maintenance request not found' });
    }
    res.status(200).json(maintenanceRequest);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a maintenance request
export const deleteMaintenanceRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const maintenanceRequest = await Maintenance.findByIdAndDelete(
      req.params.id
    );
    if (!maintenanceRequest) {
      return res.status(404).json({ message: 'Maintenance request not found' });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
