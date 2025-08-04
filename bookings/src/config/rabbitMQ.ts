import amqp from "amqplib";

export async function getRabbitMQChannel() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost"); 
  const channel = await connection.createChannel();

  return { channel, connection };

  
}


