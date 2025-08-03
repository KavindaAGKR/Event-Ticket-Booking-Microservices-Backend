import amqp from "amqplib";

export async function getRabbitMQChannel() {
  const connection = await amqp.connect("amqp://localhost"); // Change to your RabbitMQ server
  const channel = await connection.createChannel();
  return channel;
}
