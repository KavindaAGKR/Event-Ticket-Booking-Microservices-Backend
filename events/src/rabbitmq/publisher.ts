import amqp from "amqplib";

export async function publishEventCreated(eventData: any) {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost"
  );
  const channel = await connection.createChannel();
  const queue = "event_created";

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(eventData)));

  console.log("Published event_created:", eventData);

  //close connection after publishing
  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
}
