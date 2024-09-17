import express from 'express';
import { createPipelineHandler, getPipelinesHandler, getPipelineByIdHandler, updatePipelineHandler, deletePipelineHandler } from '../controllers/pipelineController';

const router = express.Router();

router.post('/', createPipelineHandler);
router.get('/', getPipelinesHandler);
router.get('/:id', getPipelineByIdHandler);
router.put('/:id', updatePipelineHandler);
router.delete('/:id', deletePipelineHandler);

export default router;