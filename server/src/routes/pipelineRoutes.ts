import express from 'express';
import { createPipelineHandler, getPipelinesHandler, getPipelineByIdHandler, updatePipelineHandler, deletePipelineHandler, getPipelinesByDeviceIdHandler } from '../controllers/pipelineController';

const router = express.Router();

router.post('/', createPipelineHandler);
router.get('/all', getPipelinesHandler);
router.get('/:id', getPipelineByIdHandler);
router.put('/:id', updatePipelineHandler);
router.delete('/:id', deletePipelineHandler);

// Route to get pipelines by device ID
router.get('/', getPipelinesByDeviceIdHandler);

export default router;