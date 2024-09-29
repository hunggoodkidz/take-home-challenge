import { Request, Response } from 'express';
import * as deviceService from '../services/deviceService';

export const getDevices = async (req: Request, res: Response) => {
  try {
    const devices = await deviceService.getAllDevices();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching devices' });
  }
};

export const getDeviceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const device = await deviceService.getDeviceById(parseInt(id));
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching device' });
  }
};

export const createDevice = async (req: Request, res: Response) => {
  const { name, status } = req.body;
  try {
    const newDevice = await deviceService.createDevice(name, status);
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(500).json({ error: 'Error creating device' });
  }
};

export const updateDevice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status } = req.body;
  try {
    const updatedDevice = await deviceService.updateDevice(parseInt(id), name, status);
    if (updatedDevice) {
      res.json(updatedDevice);
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating device' });
  }
};

export const deleteDevice = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deviceService.deleteDevice(parseInt(id));
    if (result) {
      res.json({ message: 'Device deleted' });
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting device' });
  }
};

export const createDeviceWithPipeline = async (req: Request, res: Response) => {
  try {
    const { name, status } = req.body;
    const device = await deviceService.createDeviceWithPipeline({ name, status });
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ error: 'Error creating device with pipeline' });
  }
};

// Controller for getting devices with node counts
export const getDevicesWithNodeCountHandler = async (req: Request, res: Response) => {
  try {
    const devices = await deviceService.getDevicesWithNodeCount();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching devices with node count' });
  }
};

// Controller for getting devices with data point counts
export const getDevicesWithDataPointCountHandler = async (req: Request, res: Response) => {
  try {
    const devices = await deviceService.getDevicesWithDataPointCount();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching devices with data point count' });
  }
};