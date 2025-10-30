import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Schedule } from '../entities/Schedule';
import { Teacher } from '../entities/Teacher';
import { Subject } from '../entities/Subject';

export class ScheduleController {
  async create(req: Request, res: Response) {
    try {
      const { teacherId, subjectId, dayOfWeek, startTime, endTime, classroom } = req.body;

      if (!teacherId || !subjectId || !dayOfWeek || !startTime || !endTime || !classroom) {
        return res.status(400).json({ 
          error: 'Campos obrigatórios: teacherId, subjectId, dayOfWeek, startTime, endTime, classroom' 
        });
      }

      const teacherRepository = AppDataSource.getRepository(Teacher);
      const subjectRepository = AppDataSource.getRepository(Subject);
      const scheduleRepository = AppDataSource.getRepository(Schedule);

      const teacher = await teacherRepository.findOne({ where: { id: teacherId } });
      if (!teacher) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      const subject = await subjectRepository.findOne({ where: { id: subjectId } });
      if (!subject) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }

      const schedule = scheduleRepository.create({
        teacherId,
        subjectId,
        dayOfWeek,
        startTime,
        endTime,
        classroom,
      });

      await scheduleRepository.save(schedule);

      const savedSchedule = await scheduleRepository.findOne({
        where: { id: schedule.id },
        relations: ['teacher', 'subject'],
      });

      return res.status(201).json(savedSchedule);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar horário' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const scheduleRepository = AppDataSource.getRepository(Schedule);
      const schedules = await scheduleRepository.find({
        relations: ['teacher', 'subject'],
        order: { createdAt: 'DESC' },
      });

      return res.json(schedules);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar horários' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const scheduleRepository = AppDataSource.getRepository(Schedule);
      const schedule = await scheduleRepository.findOne({
        where: { id },
        relations: ['teacher', 'subject'],
      });

      if (!schedule) {
        return res.status(404).json({ error: 'Horário não encontrado' });
      }

      return res.json(schedule);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar horário' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { teacherId, subjectId, dayOfWeek, startTime, endTime, classroom } = req.body;

      const scheduleRepository = AppDataSource.getRepository(Schedule);
      const schedule = await scheduleRepository.findOne({ where: { id } });

      if (!schedule) {
        return res.status(404).json({ error: 'Horário não encontrado' });
      }

      if (teacherId) {
        const teacherRepository = AppDataSource.getRepository(Teacher);
        const teacher = await teacherRepository.findOne({ where: { id: teacherId } });
        if (!teacher) {
          return res.status(404).json({ error: 'Professor não encontrado' });
        }
      }

      if (subjectId) {
        const subjectRepository = AppDataSource.getRepository(Subject);
        const subject = await subjectRepository.findOne({ where: { id: subjectId } });
        if (!subject) {
          return res.status(404).json({ error: 'Disciplina não encontrada' });
        }
      }

      scheduleRepository.merge(schedule, {
        teacherId: teacherId || schedule.teacherId,
        subjectId: subjectId || schedule.subjectId,
        dayOfWeek: dayOfWeek || schedule.dayOfWeek,
        startTime: startTime || schedule.startTime,
        endTime: endTime || schedule.endTime,
        classroom: classroom || schedule.classroom,
      });

      await scheduleRepository.save(schedule);

      const updatedSchedule = await scheduleRepository.findOne({
        where: { id },
        relations: ['teacher', 'subject'],
      });

      return res.json(updatedSchedule);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar horário' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const scheduleRepository = AppDataSource.getRepository(Schedule);
      const schedule = await scheduleRepository.findOne({ where: { id } });

      if (!schedule) {
        return res.status(404).json({ error: 'Horário não encontrado' });
      }

      await scheduleRepository.remove(schedule);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao deletar horário' });
    }
  }
}
