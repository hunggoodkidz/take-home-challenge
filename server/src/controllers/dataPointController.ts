import { Request, Response } from 'express';
import { 
  createDataPoint, 
  getDataPoints, 
  getDataPointById, 
  updateDataPoint, 
  deleteDataPoint 
} from '../services/dataPointService';

// Create a new DataPoint
export const createDataPointController = async (req: Request, res: Response) => {
  try {
    const { value, timestamp, nodeId, deviceId } = req.body; // Adjust if required
    const dataPoint = await createDataPoint({ value, timestamp, nodeId, deviceId });
    res.status(201).json(dataPoint);
  } catch (error) {
    res.status(500).json({ error: 'Error creating data point' });
  }
};

// Get all DataPoints
export const getDataPointsController = async (req: Request, res: Response) => {
  try {
    const dataPoints = await getDataPoints();
    res.status(200).json(dataPoints);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data points' });
  }
};

// Get DataPoint by ID
export const getDataPointByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const dataPoint = await getDataPointById(id);
    if (dataPoint) {
      res.status(200).json(dataPoint);
    } else {
      res.status(404).json({ error: 'Data point not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data point' });
  }
};

// Update DataPoint
export const updateDataPointController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { value, timestamp, nodeId, deviceId } = req.body; // Adjust if required
    const updatedDataPoint = await updateDataPoint(id, { value, timestamp, nodeId, deviceId });
    res.status(200).json(updatedDataPoint);
  } catch (error) {
    res.status(500).json({ error: 'Error updating data point' });
  }
};

// Delete DataPoint
export const deleteDataPointController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteDataPoint(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data point' });
  }
};