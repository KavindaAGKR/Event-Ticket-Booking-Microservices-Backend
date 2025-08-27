import { Request, Response } from "express";
import {
  createEventService,
  deleteEventService,
  getAllEventsService,
  getAllOrganizerEventsService,
  getEventByIdService,
  updateEventService,
} from "../services/eventServices";
import { publishEventCreated } from "../rabbitmq/publisher";


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

    // Publish event to RabbitMQ
    await publishEventCreated({
      event: event,
    });

    res.status(201).json({
      status: "SUCCESS",
      message: "Event created successfully",
      data: event,
    });
  } catch (err: any) {
    res.status(400).json({ status: "FAILED", message: err.message });
  }
};

//Get all events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await getAllEventsService();
    res.status(200).json({
      status: "SUCCESS",
      message: "Events data retrieved successfully",
      data: events,
    });
  } catch (err: any) {
    res.status(400).json({ status: "FAILED", message: err.message });
  }
};

//Get event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    console.log("Request params:", req.params);
    const eventId = parseInt(req.params.id, 10);
    const event = await getEventByIdService(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Event not found" });
    }
    res.status(200).json({
      status: "SUCCESS",
      message: "Event retrieved successfully",
      data: event,
    });
  } catch (err: any) {
    res.status(400).json({ status: "FAILED", message: err.message });
  }
};

//Get all events
export const getAllOrganizerEvents = async (req: Request, res: Response) => {
  try {
    const organizerId = req.username;
    console.log("Organizer ID:", organizerId);
    const events = await getAllOrganizerEventsService(organizerId);
    res.status(200).json({
      status: "SUCCESS",
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (err: any) {
    res.status(400).json({ status: "FAILED", message: err.message });
  }
};


//update an event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    if (req.userRole && !req.userRole.includes("organizer")) {
      return res.status(403).json({
        status: "FAILED",
        message: "User is not authorized to update events",
      });
    }
    const eventId = parseInt(req.params.id, 10);
    const event = await updateEventService(eventId, req.body);

    res.status(200).json({
      status: "SUCCESS",
      message: "Event updated successfully",
      data: event,
    });
  } catch (err: any) {
    res.status(400).json({ status: "FAILED", message: err.message });
  }
};


//delete event
export const deleteEvent = async (req: Request, res: Response) => {
  try{
    const eventId = parseInt(req.params.id, 10);
    await deleteEventService(eventId);
    res.status(200).json({ status: "SUCCESS", message: "Event deleted successfully" });
  }catch(error){
    res.status(400).json({ status: "FAILED", message: error.message });
  }
}