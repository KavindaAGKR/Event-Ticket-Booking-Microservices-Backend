import { publishPaymentResult } from "../rabbitMQ/publisher";
import prisma from "../config/database";

export async function processPayment(bookingdata: any) {
  let paymentSuccess: Boolean = false;
  // Card details process using cardDetails object
  if (
    bookingdata.cardDetails.cardNo === "1111111111111111" &&
    bookingdata.cardDetails.cvc === "123"
  ) {
    paymentSuccess = true;
  } else {
    paymentSuccess = false;
  }

  console.log("Processing payment status:", paymentSuccess);

  // Save payment record in DB
  const paymentData = {
    customerId: bookingdata.customerId,
    bookingId: bookingdata.id,
    amount: bookingdata.totalAmount || 0,
    status: paymentSuccess ? "success" : "failed",
  };
  console.log(
    "Processing payment for booking:",
    bookingdata.id,
    "Amount:",
    paymentData.amount
  );
  const response = await prisma.payment.create({ data: paymentData });
  if (!response) {
    console.error("Failed to save payment record");
    throw new Error("Failed to save payment record");
  }
  console.log("Payment processed:", response);

  const { cardDetails, ...bookingWithoutCard } = bookingdata;
  await publishPaymentResult({
    booking: bookingWithoutCard,
    paymentStatus: paymentData.status,
  });

  if (paymentSuccess) {
    console.log("Payment successful for booking", bookingdata.id);
  } else {
    console.log("Payment failed for booking", bookingdata.id);
    throw new Error("Payment failed");
  }
  return response;
}
