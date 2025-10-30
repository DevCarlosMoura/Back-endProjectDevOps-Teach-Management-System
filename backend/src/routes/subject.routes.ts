import { Router } from 'express';
import { SubjectController } from '../controllers/SubjectController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const subjectController = new SubjectController();

router.post('/', authMiddleware, subjectController.create);
router.get('/', authMiddleware, subjectController.getAll);
router.get('/:id', authMiddleware, subjectController.getById);
router.put('/:id', authMiddleware, subjectController.update);
router.delete('/:id', authMiddleware, subjectController.delete);

export default router;
