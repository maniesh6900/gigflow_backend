import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = async (req : Request, res : Response, next: NextFunction) => {
  try {
    const {token} = req.cookies;
    
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    req.userId = decoded?.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};