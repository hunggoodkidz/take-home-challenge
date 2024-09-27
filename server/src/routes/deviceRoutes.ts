import { Router } from 'express';
import * as deviceController from '../controllers/deviceController';

const router = Router();

router.get('/', deviceController.getDevices);
router.get('/:id', deviceController.getDeviceById);
router.post('/', deviceController.createDeviceWithPipeline);
router.put('/:id', deviceController.updateDevice);
router.delete('/:id', deviceController.deleteDevice);

export default router;