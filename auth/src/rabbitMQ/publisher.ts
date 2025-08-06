import { getRabbitMQChannel } from "../config/rabbitMQ";

export async function publishUserSignup(eventData: any) {
  const { channel, connection } = await getRabbitMQChannel();
  const queue = "user_signup";

  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(eventData)));

  await channel.close();
  await connection.close();
  console.log("Published user_signup:", eventData);
}
