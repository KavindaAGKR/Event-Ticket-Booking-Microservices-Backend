// File: src/models/event.model.ts
export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELLED = 'CANCELLED',
}

export interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  venue: string;
  startDateTime: Date;
  endDateTime: Date;
  ticketPrice: number;
  totalTickets: number;
  soldTickets: number;
  category: string;
  imageUrl?: string;
  status: EventStatus;
  organizerId: number;
  organizerName?: string;
  createdAt: Date;
  updatedAt: Date;
}
