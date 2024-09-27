import { Router } from 'express';
import * as nodeController from '../controllers/nodeController';

const router = Router();

router.post('/', nodeController.createNode);
router.get('/all', nodeController.getAllNodes);
router.get('/:id', nodeController.getNode);
router.put('/:id', nodeController.updateNode);
router.delete('/:id', nodeController.deleteNode);
// Route to get nodes by pipeline ID
router.get('/', nodeController.getNodesByPipelineIdHandler);
export default router;
