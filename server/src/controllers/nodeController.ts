import { Request, Response } from 'express';
import * as nodeService from '../services/nodeService';

export const createNode = async (req: Request, res: Response) => {
  try {
    const { name, type, position, pipelineId } = req.body;
    const newNode = await nodeService.createNode(name, type, position, pipelineId);
    res.status(201).json(newNode);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching devices' });
  }
};

export const getNode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const node = await nodeService.getNodeById(Number(id));
    if (node) {
      res.json(node);
    } else {
      res.status(404).json({ error: 'Node not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching devices' });
  }
};

export const getAllNodes = async (req: Request, res: Response) => {
  try {
    const nodes = await nodeService.getAllNodes();
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching devices' });
  }
};

export const updateNode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedNode = await nodeService.updateNode(Number(id), data);
    res.json(updatedNode);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching devices' });
  }
};

export const deleteNode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedNode = await nodeService.deleteNode(Number(id));
    res.json(deletedNode);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching devices' });
  }
};
