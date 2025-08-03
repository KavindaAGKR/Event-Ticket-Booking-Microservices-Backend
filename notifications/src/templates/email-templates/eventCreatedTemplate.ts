export interface EventData {
  name: string;
  description: string;
  location: string;
  venue: string;
  startDateTime: string;
  endDateTime: string;
  ticketPrice: number;
  totalTickets: number;
  category: string;
  status: string;
  imageUrl: string;
  organizerName: string;
  organizerEmail: string;
createdAt: string;
}

export function eventCreatedTemplate(eventData: EventData) {
  return {
    subject: `🎉 Your Event "${eventData.name}" Has Been Published!`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px; border-radius: 8px;">
        <img src="${
          eventData.imageUrl
        }" alt="Event Cover" style="width:100%; max-width:400px; border-radius:8px; margin-bottom:16px;" />
        <h2 style="color: #2d7ff9;">${eventData.name}</h2>
        <p><em>${eventData.description}</em></p>
        <hr style="margin: 16px 0;" />
        <ul style="list-style: none; padding: 0;">
          <li><strong>Date & Time:</strong> ${new Date(
            eventData.startDateTime
          ).toLocaleString()} - ${new Date(
      eventData.endDateTime
    ).toLocaleString()}</li>
          <li><strong>Location:</strong> ${eventData.location}</li>
          <li><strong>Venue:</strong> ${eventData.venue}</li>
          <li><strong>Category:</strong> ${eventData.category}</li>
          <li><strong>Ticket Price:</strong> $${eventData.ticketPrice}</li>
          <li><strong>Total Tickets:</strong> ${eventData.totalTickets}</li>
        </ul>
        <hr style="margin: 16px 0;" />
        <p>Dear ${eventData.organizerName} (${eventData.organizerEmail}),</p>
        <p>Your event has been successfully created and is currently in <strong>${
          eventData.status
        }</strong> status.</p>
        <p>Thank you for choosing our platform to host your event!</p>
        <p style="margin-top:24px; color:#888;">Created on: ${new Date(
          eventData.createdAt
        ).toLocaleString()}</p>
      </div>
    `,
  };
}
