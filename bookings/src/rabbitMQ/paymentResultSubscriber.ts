import { getRabbitMQChannel } from "../config/rabbitMQ";
import { pendingResponses } from "../controllers/bookingController";
import { updateBookingPaymentStatus } from "../services/bookingServices";

const handleBookingResponse = (paymentResult) => {
  const bookingId = paymentResult.booking.id;
  const res = pendingResponses.get(bookingId);
  //console.log("saved response = ", res);
  if (res) {
    if (paymentResult.paymentStatus === "success") {
      res.status(200).json({
        status: "SUCCESS",
        message: "Booking and payment successful",
        data: paymentResult,
      });
    } else {
      res.status(400).json({
        status: "FAILED",
        message: "Payment failed",
        data: paymentResult,
      });
    }
    pendingResponses.delete(bookingId);
  }
};

export async function startPaymentResultSubscriber() {
  const { channel } = await getRabbitMQChannel();
  const exchangeName = "payment_result_exchange";
  const queueName = "bookings_payment_result";

  await channel.assertExchange(exchangeName, "fanout", { durable: true });
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, exchangeName, "");

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const paymentData = JSON.parse(msg.content.toString());
      console.log("Received payment_result:", paymentData);
      const { booking, paymentStatus } = paymentData;

      paymentData.booking = {
        ...booking,
        paymentStatus: paymentStatus,
        paymentId: booking.paymentId,
        status: paymentStatus === "SUCCESS" ? "CONFIRMED" : "FAILED",
      };
      updateBookingPaymentStatus(paymentData.booking);
      handleBookingResponse(paymentData);

      channel.ack(msg);
    }
  });

  console.log(
    `Listening for messages on RabbitMQ exchange: ${exchangeName}, queue: ${queueName}`
  );
}
