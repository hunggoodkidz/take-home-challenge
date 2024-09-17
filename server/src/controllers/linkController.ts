import { Request, Response } from 'express';
import * as Link from '../services/linkService';

// Create a new link
export const createLink = async (req: Request, res: Response) => {
    try {
        const { sourceNodeId, targetNodeId } = req.body;
        const link = await Link.createLink(sourceNodeId, targetNodeId);
        res.status(201).json(link);
    } catch (error) {
        res.status(500).json({ message: 'Error creating link', error });
    }
};

// Get all links
export const getLinks = async (req: Request, res: Response) => {
    try {
        const links = await Link.getLinks();
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching links', error });
    }
};

// Get a single link by ID
export const getLinkById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const link = await Link.getLinkById(parseInt(id));
        if (link) {
            res.status(200).json(link);
        } else {
            res.status(404).json({ message: 'Link not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching link', error });
    }
};

// Update a link by ID
export const updateLink = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { sourceNodeId, targetNodeId } = req.body;
        const updatedLink = await Link.updateLink(parseInt(id), sourceNodeId, targetNodeId);
        if (updatedLink) {
            res.status(200).json(updatedLink);
        } else {
            res.status(404).json({ message: 'Link not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating link', error });
    }
};

// Delete a link by ID
export const deleteLink = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedLink = await Link.deleteLink(parseInt(id));
        if (deletedLink) {
            res.status(200).json({ message: 'Link deleted successfully' });
        } else {
            res.status(404).json({ message: 'Link not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting link', error });
    }
};