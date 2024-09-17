import { Router } from 'express';
import * as nodeController from '../controllers/nodeController';

const router = Router();

router.post('/', nodeController.createNode);
router.get('/', nodeController.getAllNodes);
router.get('/:id', nodeController.getNode);
router.put('/:id', nodeController.updateNode);
router.delete('/:id', nodeController.deleteNode);

export default router;
