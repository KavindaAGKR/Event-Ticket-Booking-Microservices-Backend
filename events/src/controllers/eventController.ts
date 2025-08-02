import { Request, Response } from "express";
import {
  createEventService,
  getAllEventsService,
  getEventByIdService,
} from "../services/eventServices";


//Create an event
export const createEvent = async (req: Request, res: Response) => {
  try {
    if (req.userRole && !req.userRole.includes("organizer")) {
      return res.status(403).json({
        status: "FAILED",
        message: "User is not authorized to create events",
      });
    }

    const event = await createEventService(req.body, req.username);
    res.status(201).json(event);
  } catch (err: any) {
    res.status(400).json({ status: "FAILED", message: err.message });
  }
};

//Get all events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await getAllEventsService();
    res.status(200).json({ status: "SUCCESS", data: events });
  } catch (err: any) {
    res.status(400).json({ status: "FAILED", message: err.message });
  }
};

//Get event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    const event = await getEventByIdService(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Event not found" });
    }
    res.status(200).json({ status: "SUCCESS", data: event });
  } catch (err: any) {
    res.status(400).json({ status: "FAILED", message: err.message });
  }
};
