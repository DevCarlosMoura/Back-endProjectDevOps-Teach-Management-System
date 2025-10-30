import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Teacher } from '../entities/Teacher';

export class TeacherController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, phone, specialization, bio } = req.body;

      if (!name || !email || !phone || !specialization) {
        return res.status(400).json({ error: 'Campos obrigatórios: name, email, phone, specialization' });
      }

      const teacherRepository = AppDataSource.getRepository(Teacher);

      const teacherExists = await teacherRepository.findOne({ where: { email } });

      if (teacherExists) {
        return res.status(400).json({ error: 'Professor com este email já existe' });
      }

      const teacher = teacherRepository.create({
        name,
        email,
        phone,
        specialization,
        bio,
      });

      await teacherRepository.save(teacher);

      return res.status(201).json(teacher);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar professor' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const teacherRepository = AppDataSource.getRepository(Teacher);
      const teachers = await teacherRepository.find({
        order: { createdAt: 'DESC' },
      });

      return res.json(teachers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar professores' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const teacherRepository = AppDataSource.getRepository(Teacher);
      const teacher = await teacherRepository.findOne({
        where: { id },
        relations: ['schedules', 'schedules.subject'],
      });

      if (!teacher) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      return res.json(teacher);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar professor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, phone, specialization, bio, active } = req.body;

      const teacherRepository = AppDataSource.getRepository(Teacher);
      const teacher = await teacherRepository.findOne({ where: { id } });

      if (!teacher) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      if (email && email !== teacher.email) {
        const emailExists = await teacherRepository.findOne({ where: { email } });
        if (emailExists) {
          return res.status(400).json({ error: 'Email já está em uso' });
        }
      }

      teacherRepository.merge(teacher, {
        name: name || teacher.name,
        email: email || teacher.email,
        phone: phone || teacher.phone,
        specialization: specialization || teacher.specialization,
        bio: bio !== undefined ? bio : teacher.bio,
        active: active !== undefined ? active : teacher.active,
      });

      await teacherRepository.save(teacher);

      return res.json(teacher);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar professor' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const teacherRepository = AppDataSource.getRepository(Teacher);
      const teacher = await teacherRepository.findOne({ where: { id } });

      if (!teacher) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      await teacherRepository.remove(teacher);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao deletar professor' });
    }
  }
}
