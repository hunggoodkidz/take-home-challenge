import { Request, Response } from 'express';
import { createNotification, getNotifications, getNotificationById, updateNotification, deleteNotification } from '../services/notificationService';

export const createNotificationHandler = async (req: Request, res: Response) => {
  try {
    const { message, nodeId } = req.body;
    const notification = await createNotification(message, nodeId);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getNotificationsHandler = async (req: Request, res: Response) => {
  try {
    const notifications = await getNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getNotificationByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const notification = await getNotificationById(id);
    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateNotificationHandler = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { message } = req.body;
    const notification = await updateNotification(id, message);
    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteNotificationHandler = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteNotification(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error});
  }
};