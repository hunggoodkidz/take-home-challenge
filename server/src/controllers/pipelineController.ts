import { Request, Response } from 'express';
import { 
  createPipeline, 
  getPipelines, 
  getPipelineById, 
  updatePipeline, 
  deletePipeline 
} from '../services/pipelineService';

export const createPipelineHandler = async (req: Request, res: Response) => {
  try {
    const { name, description, deviceId } = req.body;
    
    // Check if deviceId is provided
    if (!deviceId) {
      return res.status(400).json({ message: 'Device ID is required to create a pipeline' });
    }

    const pipeline = await createPipeline(name, description, deviceId);
    res.status(201).json(pipeline);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getPipelinesHandler = async (req: Request, res: Response) => {
  try {
    const pipelines = await getPipelines();
    res.status(200).json(pipelines);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getPipelineByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const pipeline = await getPipelineById(id);
    if (pipeline) {
      res.status(200).json(pipeline);
    } else {
      res.status(404).json({ message: 'Pipeline not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatePipelineHandler = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, deviceId } = req.body;

    // Check if deviceId is provided when updating
    if (!deviceId) {
      return res.status(400).json({ message: 'Device ID is required to update the pipeline' });
    }

    const pipeline = await updatePipeline(id, name, description, deviceId);
    if (pipeline) {
      res.status(200).json(pipeline);
    } else {
      res.status(404).json({ message: 'Pipeline not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deletePipelineHandler = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deletePipeline(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
