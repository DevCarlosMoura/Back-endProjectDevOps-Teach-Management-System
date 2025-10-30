import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { Teacher } from '../entities/Teacher';
import { Subject } from '../entities/Subject';
import { Schedule } from '../entities/Schedule';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'teacher_management',
  synchronize: true, // Em produção, use migrations
  logging: false,
  entities: [User, Teacher, Subject, Schedule],
  migrations: [],
  subscribers: [],
});
