import { Router } from 'express';
import { ScheduleController } from '../controllers/ScheduleController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const scheduleController = new ScheduleController();

router.post('/', authMiddleware, scheduleController.create);
router.get('/', authMiddleware, scheduleController.getAll);
router.get('/:id', authMiddleware, scheduleController.getById);
router.put('/:id', authMiddleware, scheduleController.update);
router.delete('/:id', authMiddleware, scheduleController.delete);

export default router;
