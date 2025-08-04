import { getRabbitMQChannel } from "../config/rabbitMQ";
import { sendEmailNotification } from "../services/notificationService";
import { paymentResultTemplate } from "../templates/email-templates/paymentResultTemplate";

export async function startPaymentResultSubscriber() {
  const { channel } = await getRabbitMQChannel();
  const exchangeName = "payment_result_exchange";
  const queueName = "notifications_payment_result"; // Unique queue for notifications service

  await channel.assertExchange(exchangeName, "fanout", { durable: true });
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, exchangeName, "");

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const paymentData = JSON.parse(msg.content.toString());
      console.log("Received payment_result:", paymentData);

      const template = paymentResultTemplate(paymentData);
      await sendEmailNotification(
        paymentData.booking.customerEmail,
        template.subject,
        template.html
      );

      channel.ack(msg);
    }
  });

  console.log(
    `Listening for messages on RabbitMQ exchange: ${exchangeName}, queue: ${queueName}`
  );
}

// export async function subscribePaymentResult(
//   queueName: string,
//   onMessage: (msg: any) => void
// ) {
//   const { channel } = await getRabbitMQChannel();
//   const exchangeName = "payment_result_exchange";
//   await channel.assertExchange(exchangeName, "fanout", { durable: true });
//   await channel.assertQueue(queueName, { durable: true });
//   await channel.bindQueue(queueName, exchangeName, "");
//   channel.consume(queueName, (msg) => {
//     if (msg) {
//       const result = JSON.parse(msg.content.toString());
//       onMessage(result);
//       channel.ack(msg);
//     }
//   });
// }
