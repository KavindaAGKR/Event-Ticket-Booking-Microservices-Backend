import { processPayment } from "../services/paymentService";
import { getRabbitMQChannel } from "../config/rabbitMQ";

export async function startBookingCreatedSubscriber() {
  const { channel } = await getRabbitMQChannel();
  const queue = "booking_created";
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (msg) {
      const bookingData = JSON.parse(msg.content.toString());
      console.log("Received booking_created:", bookingData);
      try {
        await processPayment(bookingData);
        channel.ack(msg);
      } catch (err) {
        channel.nack(msg, false, false);
      }
    }
  });
  console.log(`Subscribed to ${queue} queue for booking events.`);
}
