import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Subject } from '../entities/Subject';

export class SubjectController {
  async create(req: Request, res: Response) {
    try {
      const { name, code, description, workload } = req.body;

      if (!name || !code || !workload) {
        return res.status(400).json({ error: 'Campos obrigatórios: name, code, workload' });
      }

      const subjectRepository = AppDataSource.getRepository(Subject);

      const subjectExists = await subjectRepository.findOne({ where: { name } });

      if (subjectExists) {
        return res.status(400).json({ error: 'Disciplina com este nome já existe' });
      }

      const subject = subjectRepository.create({
        name,
        code,
        description,
        workload,
      });

      await subjectRepository.save(subject);

      return res.status(201).json(subject);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar disciplina' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const subjectRepository = AppDataSource.getRepository(Subject);
      const subjects = await subjectRepository.find({
        order: { createdAt: 'DESC' },
      });

      return res.json(subjects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar disciplinas' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const subjectRepository = AppDataSource.getRepository(Subject);
      const subject = await subjectRepository.findOne({
        where: { id },
        relations: ['schedules', 'schedules.teacher'],
      });

      if (!subject) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }

      return res.json(subject);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar disciplina' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, code, description, workload } = req.body;

      const subjectRepository = AppDataSource.getRepository(Subject);
      const subject = await subjectRepository.findOne({ where: { id } });

      if (!subject) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }

      if (name && name !== subject.name) {
        const nameExists = await subjectRepository.findOne({ where: { name } });
        if (nameExists) {
          return res.status(400).json({ error: 'Nome já está em uso' });
        }
      }

      subjectRepository.merge(subject, {
        name: name || subject.name,
        code: code || subject.code,
        description: description !== undefined ? description : subject.description,
        workload: workload || subject.workload,
      });

      await subjectRepository.save(subject);

      return res.json(subject);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar disciplina' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const subjectRepository = AppDataSource.getRepository(Subject);
      const subject = await subjectRepository.findOne({ where: { id } });

      if (!subject) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }

      await subjectRepository.remove(subject);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao deletar disciplina' });
    }
  }
}
