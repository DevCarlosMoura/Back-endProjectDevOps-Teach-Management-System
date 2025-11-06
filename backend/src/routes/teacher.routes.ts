import { Router } from 'express';
import { TeacherController } from '../controllers/TeacherController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const teacherController = new TeacherController();

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     tags:
 *       - Teachers
 *     summary: Criar novo professor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               specialization:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *       401:
 *         description: Erro ao criar o professor
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, teacherController.create);

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     tags:
 *       - Teachers
 *     summary: Listar todos os professores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de professores
 *       401:
 *         description: Erro ao criar o professor 
 *       500:     
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, teacherController.getAll);

/**
 * @swagger
 * /api/teachers/{id}:
 *   get:
 *     tags:
 *       - Teachers
 *     summary: Buscar professor por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Professor encontrado
 *       404:    
 *         description: Professor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, teacherController.getById);

/**
 * @swagger
 * /api/teachers/{id}:
 *   put:
 *     tags:
 *       - Teachers
 *     summary: Atualizar professor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               specialization:
 *                 type: string
 *               bio:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Professor atualizado
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, teacherController.update);

/**
 * @swagger
 * /api/teachers/{id}:
 *   delete:
 *     tags:
 *       - Teachers
 *     summary: Deletar professor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Professor deletado
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, teacherController.delete);

export default router;
