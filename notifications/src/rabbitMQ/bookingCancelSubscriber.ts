import { getRabbitMQChannel } from "../config/rabbitMQ";
import { sendEmailNotification } from "../services/notificationService";
import { bookingCancelledTemplate } from "../templates/email-templates/bookingCancelledTemplate";

export async function startBookingCancelledSubscriber() {
  const { channel } = await getRabbitMQChannel();
  const exchangeName = "booking_cancelled_exchange";
  const queueName = "notifications_booking_cancelled";

  await channel.assertExchange(exchangeName, "fanout", { durable: true });
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, exchangeName, "");

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const bookingData = JSON.parse(msg.content.toString());
      console.log("Received booking_cancelled:", bookingData);

      const template = bookingCancelledTemplate(bookingData);
      await sendEmailNotification(
        bookingData.booking.customerEmail,
        template.subject,
        template.html
      );

      channel.ack(msg);
    }
  });

  console.log(
    `Listening for messages on RabbitMQ exchange: ${exchangeName}, queue: ${queueName}`
  );
}
