import prisma from "../config/database";
import { EventStatus } from "../models/eventModel";

export const createEvent = async (data: any) => {
  const now = new Date();
  return prisma.event.create({
    data: {
      ...data,
      soldTickets: 0,
      status: EventStatus.DRAFT,
      createdAt: now,
      updatedAt: now,
    },
  });
};
