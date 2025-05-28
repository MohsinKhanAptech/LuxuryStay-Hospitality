import { Request, Response } from 'express';
import SystemSettings from '../models/systemSettingsModel';

// Create new system settings
export const createSystemSettings = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const systemSettings = new SystemSettings(req.body);
    await systemSettings.save();
    res.status(201).json(systemSettings);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve all system settings
export const getAllSystemSettings = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const systemSettings = await SystemSettings.find();
    res.status(200).json(systemSettings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a specific system setting by ID
export const getSystemSettingById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const systemSetting = await SystemSettings.findById(req.params.id);
    if (!systemSetting) {
      return res.status(404).json({ message: 'System setting not found' });
    }
    res.status(200).json(systemSetting);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update system settings
export const updateSystemSettings = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const systemSetting = await SystemSettings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!systemSetting) {
      return res.status(404).json({ message: 'System setting not found' });
    }
    res.status(200).json(systemSetting);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete system settings
export const deleteSystemSettings = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const systemSetting = await SystemSettings.findByIdAndDelete(req.params.id);
    if (!systemSetting) {
      return res.status(404).json({ message: 'System setting not found' });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
