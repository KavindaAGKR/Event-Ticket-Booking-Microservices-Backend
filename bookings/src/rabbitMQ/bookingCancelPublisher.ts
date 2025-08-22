import { getRabbitMQChannel } from "../config/rabbitMQ";

export async function publishBookingCancelled(result: any) {
  const { channel, connection } = await getRabbitMQChannel();
  const exchangeName = "booking_cancelled_exchange";
  await channel.assertExchange(exchangeName, "fanout", { durable: true });
  channel.publish(exchangeName, "", Buffer.from(JSON.stringify(result)));
  await channel.close();
  await connection.close();
}
