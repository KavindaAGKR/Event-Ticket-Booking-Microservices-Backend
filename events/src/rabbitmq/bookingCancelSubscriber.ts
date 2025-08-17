import { getRabbitMQChannel } from "../config/rabbitMQ";
import { decreaseSoldTickets, updateEventTickets } from "../services/eventServices";

export async function startBookingCancelledSubscriber() {
  const { channel } = await getRabbitMQChannel();
  const exchangeName = "booking_cancelled_exchange";
  const queueName = "event_booking_cancelled";

  await channel.assertExchange(exchangeName, "fanout", { durable: true });
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, exchangeName, "");

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const bookingData = JSON.parse(msg.content.toString());
      console.log("Received booking_cancelled:", bookingData);
      const { booking } = bookingData;

      await decreaseSoldTickets(booking);

      channel.ack(msg);
    }
  });

  console.log(
    `Listening for messages on RabbitMQ exchange: ${exchangeName}, queue: ${queueName}`
  );
}
