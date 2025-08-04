import { getRabbitMQChannel } from "../config/rabbitMQ";

export async function publishPaymentResult(result: any) {
  const { channel, connection } = await getRabbitMQChannel();
  const exchangeName = "payment_result_exchange";
  await channel.assertExchange(exchangeName, "fanout", { durable: true });
  channel.publish(exchangeName, "", Buffer.from(JSON.stringify(result)));
  await channel.close();
  await connection.close();
}
