import { getRabbitMQChannel } from "../config/rabbitMQ";

export async function publishEventCreated(eventData: any) {
  const { channel, connection } = await getRabbitMQChannel();
  const queue = "event_created";

  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(eventData)));

  await channel.close();
  await connection.close();
  console.log("Published event_created:", eventData);
}
