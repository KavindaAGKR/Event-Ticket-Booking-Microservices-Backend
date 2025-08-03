import { getRabbitMQChannel } from "../config/rabbitMQ";

export async function publishPaymentResult(result: any) {
  const { channel, connection } = await getRabbitMQChannel();
  await channel.assertQueue("payment_result", { durable: true });
  channel.sendToQueue("payment_result", Buffer.from(JSON.stringify(result)));
  await channel.close();
  await connection.close();
}
