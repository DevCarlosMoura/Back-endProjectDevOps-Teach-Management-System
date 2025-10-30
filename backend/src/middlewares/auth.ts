import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: 'Token mal formatado' });
    }

    const secret = process.env.JWT_SECRET || 'default-secret';

    jwt.verify(token, secret, (err, decoded: any) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
      }

      req.userId = decoded.id;
      req.userEmail = decoded.email;
      return next();
    });
  } catch (error) {
    return res.status(401).json({ error: 'Falha na autenticação' });
  }
};
