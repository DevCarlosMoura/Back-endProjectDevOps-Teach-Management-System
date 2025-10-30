import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const userRepository = AppDataSource.getRepository(User);

      const userExists = await userRepository.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = userRepository.create({
        email,
        password: hashedPassword,
        name,
      });

      await userRepository.save(user);

      const { password: _, ...userWithoutPassword } = user;

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const secret = process.env.JWT_SECRET || 'default-secret';

      const token = jwt.sign(
        { id: user.id, email: user.email },
        secret,
        { expiresIn: '24h' }
      );

      const { password: _, ...userWithoutPassword } = user;

      return res.json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }
}
