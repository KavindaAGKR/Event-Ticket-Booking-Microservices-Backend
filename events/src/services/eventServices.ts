import prisma from "../config/database";
import { EventStatus } from "../models/eventModel";

// Create an event service
export const createEventService = async (data: any, organizerId: string) => {
  const now = new Date();

    return prisma.event.create({
      data: {
        ...data,
        organizerId: organizerId,
        soldTickets: 0,
        status: EventStatus.DRAFT,
        createdAt: now,
        updatedAt: now,
      },
    });

};

// Get all events service
export const getAllEventsService = async () => {
  return prisma.event.findMany();
};

// Get event by ID service
export const getEventByIdService = async (id: number) => {
  return prisma.event.findUnique({
    where: {
      id: id,
    },
  });
};
