import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from '../controllers/task.controller.js';
import { validateTaskPayload } from '../utils/task-validation.js';

const router = Router();

router.get('/', listTasks);
router.post('/', validateTaskPayload(), createTask);
router.get('/:id', getTask);
router.patch('/:id', validateTaskPayload({ partial: true }), updateTask);
router.delete('/:id', deleteTask);

export default router;
