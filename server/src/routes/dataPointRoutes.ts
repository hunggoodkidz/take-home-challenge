import express from 'express';
import { 
  createDataPointController, 
  getDataPointsController, 
  getDataPointByIdController, 
  updateDataPointController, 
  deleteDataPointController 
} from '../controllers/dataPointController';

const router = express.Router();

router.post('/', createDataPointController);
router.get('/', getDataPointsController);
router.get('/:id', getDataPointByIdController);
router.put('/:id', updateDataPointController);
router.delete('/:id', deleteDataPointController);

export default router;