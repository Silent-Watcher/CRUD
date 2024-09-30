import { Router } from 'express';

import taskController from './task.controller';

const router = Router();

router.get('/' ,taskController.getAll);

export default router;
