import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const jwtSecret = this.config.get<string>('JWT_SECRET');
    const { method, originalUrl } = req;

    const publicRoutes = [
      { url: /^\/$/, methods: ['GET'] },
      { url: /^\/doc/, methods: ['GET'] },
      { url: /^\/auth\/signup$/, methods: ['POST'] },
      { url: /^\/auth\/login$/, methods: ['POST'] },
      { url: /^\/auth\/refresh$/, methods: ['POST'] },
    ];

    const isPublic = publicRoutes.some(
      (route) => route.url.test(originalUrl) && route.methods.includes(method),
    );
    if (isPublic) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token)
      return res.status(401).json({ message: 'Unauthorized' });

    try {
      jwt.verify(token, jwtSecret);
      return next();
    } catch {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
