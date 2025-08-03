import { getRabbitMQChannel } from "../config/rabbitMQ";
import { sendEmailNotification } from "../services/notificationService";
import { eventCreatedTemplate } from "../templates/email-templates/eventCreatedTemplate";

export async function startEventCreatedSubscriber() {
  const {channel} = await getRabbitMQChannel();
  const queue = "event_created";
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const eventData = JSON.parse(msg.content.toString());
      console.log("Received event_created:", eventData);

      const template = eventCreatedTemplate(eventData.event);
      await sendEmailNotification(
        eventData.event.organizerEmail,
        template.subject,
        template.html
      );

      channel.ack(msg);
    }
  });

  console.log(`Listening for messages on RabbitMQ queue: ${queue}`);
}
