import { getRabbitMQChannel } from "../config/rabbitMQ";
import { updateEventTickets } from "../services/eventServices";

export async function startPaymentResultSubscriber() {
  const { channel } = await getRabbitMQChannel();
  const exchangeName = "payment_result_exchange";
  const queueName = "event_payment_result";

  await channel.assertExchange(exchangeName, "fanout", { durable: true });
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, exchangeName, "");

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const paymentData = JSON.parse(msg.content.toString());
      console.log("Received payment_result:", paymentData);
      const { booking, paymentStatus } = paymentData;

      if (paymentStatus === "success") {
        await updateEventTickets(booking);
      }

      channel.ack(msg);
    }
  });

  console.log(
    `Listening for messages on RabbitMQ exchange: ${exchangeName}, queue: ${queueName}`
  );
}
