import { getRabbitMQChannel } from "../config/rabbitMQ";

export async function publishBookingCreated(bookingData: any) {
  const { channel, connection } = await getRabbitMQChannel();

  const queue = "booking_created";
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(bookingData)));
  await channel.close();
  await connection.close();
  console.log("Published booking_created:", bookingData);
}
