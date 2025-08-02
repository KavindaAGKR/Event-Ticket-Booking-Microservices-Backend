import { Request, Response } from 'express';
import { createEvent } from '../services/eventServices';

export const createEventHandler = async (req: Request, res: Response) => {
  try {
    const event = await createEvent(req.body);
    res.status(201).json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
