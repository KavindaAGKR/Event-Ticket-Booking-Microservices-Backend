export function eventCreatedTemplate(eventData: { title: string; date: string; location: string; creatorEmail: string }) {
  return {
    subject: `Your Event "${eventData.title}" is Created!`,
    html: `
      <h2>Event Created Successfully!</h2>
      <p>Dear ${eventData.creatorEmail},</p>
      <p>Your event <strong>${eventData.title}</strong> has been created.</p>
      <ul>
        <li><strong>Date:</strong> ${eventData.date}</li>
        <li><strong>Location:</strong> ${eventData.location}</li>
      </ul>
      <p>Thank you for using our platform!</p>
    `
  };
}