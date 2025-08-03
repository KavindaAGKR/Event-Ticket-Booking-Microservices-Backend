import { Prisma } from "@prisma/client";
import prisma from "../config/database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export enum EventStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELLED = "CANCELLED",
}

// Create an event service
export const createEventService = async (data: any, organizerId: string) => {
  try {
    return await prisma.event.create({
      data: {
        ...data,
        organizerId: organizerId,
        soldTickets: 0,
        status: EventStatus.PUBLISHED,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      // Unique constraint error message
      throw new Error(
        `Unique constraint failed on the fields: (${
          Array.isArray(error.meta?.target)
            ? (error.meta?.target as string[]).join(", ")
            : String(error.meta?.target)
        })`
      );
    }
    throw error;
  }
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
