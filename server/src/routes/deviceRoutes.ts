import { Router } from 'express';
import * as deviceController from '../controllers/deviceController';

const router = Router();

router.get('/', deviceController.getDevices);
router.get('/:id', deviceController.getDeviceById);
router.post('/', deviceController.createDeviceWithPipeline);
router.put('/:id', deviceController.updateDevice);
router.delete('/:id', deviceController.deleteDevice);

// Route to get devices with node counts
router.get('/with-node-count', deviceController.getDevicesWithNodeCountHandler);

// Route to get devices with data point counts
router.get('/with-data-point-count', deviceController.getDevicesWithDataPointCountHandler);

export default router;