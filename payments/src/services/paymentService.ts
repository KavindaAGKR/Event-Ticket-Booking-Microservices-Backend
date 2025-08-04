import { publishPaymentResult } from "../rabbitMQ/publisher";
import prisma from "../config/database";

export async function processPayment(bookingdata: any) {
  const { booking, cardDetails } = bookingdata;
  // Card details process using cardDetails object
  const paymentSuccess = Math.random() > 0.2; // random success/fail response for demo purposes
  console.log("Processing payment for booking:", booking.id);

  // Save payment record in DB
  const paymentData = {
    customerId: booking.customerId,
    bookingId: booking.id,
    amount: booking.totalAmount || 0,
    status: paymentSuccess ? "success" : "failed",
  };
  console.log(
    "Processing payment for booking:",
    booking.id,
    "Amount:",
    paymentData.amount
  );
  const response = await prisma.payment.create({ data: paymentData });
  if (!response) {
    console.error("Failed to save payment record");
    throw new Error("Failed to save payment record");
  }
  console.log("Payment processed:", response);

  await publishPaymentResult({
    booking: booking,
    paymentStatus: paymentData.status,
  });
  if (paymentSuccess) {
    console.log("Payment successful for booking", booking.id);
  } else {
    console.log("Payment failed for booking", booking.id);
    throw new Error("Payment failed");
  }
}
