import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { url, method } = req;

    if (
      url === '/' ||
      url.startsWith('/doc') ||
      (url === '/auth/signup' && method === 'POST') ||
      (url === '/auth/login' && method === 'POST') ||
      (url === '/auth/refresh' && method === 'POST')
    ) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token)
      return res.status(401).json({ message: 'Unauthorized' });

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return next();
    } catch {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
