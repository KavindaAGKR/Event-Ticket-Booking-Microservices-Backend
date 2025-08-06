import { getRabbitMQChannel } from "../config/rabbitMQ";
import { sendEmailNotification } from "../services/notificationService";
import { userSignupTemplate } from "../templates/email-templates/userSignupTemplate";

export async function startUserSignupSubscriber() {
  const { channel } = await getRabbitMQChannel();
  const queue = "user_signup";
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const eventData = JSON.parse(msg.content.toString());
      console.log("Received user_signup:", eventData);

      const template = userSignupTemplate(eventData.email);
      await sendEmailNotification(
        eventData.email,
        template.subject,
        template.html
      );

      channel.ack(msg);
    }
  });

  console.log(`Listening for messages on RabbitMQ queue: ${queue}`);
}
