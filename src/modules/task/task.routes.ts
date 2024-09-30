import { removeEmptyValues } from '$app/common/middlewares/omitEmpty.middleware';
import { validateBody, validateParams } from '$app/common/validation/dataValidator';
import { zTask } from '$app/common/validation/schema/task.schema';
import { Router } from 'express';

import taskController from './task.controller';

const router = Router();

router.get('/', taskController.getAll);
router.delete('/:id', taskController.delete);

router.post(
  '/',
  removeEmptyValues(),
  validateBody(zTask.omit({ isDone: true, createdAt: true, updatedAt: true })),
  taskController.create,
);

export default router;
