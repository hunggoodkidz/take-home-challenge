import express from 'express';
import { createNotificationHandler, getNotificationsHandler, getNotificationByIdHandler, updateNotificationHandler, deleteNotificationHandler } from '../controllers/notificationController';

const router = express.Router();

router.post('/', createNotificationHandler);
router.get('/', getNotificationsHandler);
router.get('/:id', getNotificationByIdHandler);
router.put('/:id', updateNotificationHandler);
router.delete('/:id', deleteNotificationHandler);

export default router;