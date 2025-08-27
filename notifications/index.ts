import dotenv from "dotenv";
import { startEventCreatedSubscriber } from "./src/rabbitMQ/eventCreatedSubscriber";
import { startPaymentResultSubscriber } from "./src/rabbitMQ/paymentResultSubscriber";
import { startUserSignupSubscriber } from "./src/rabbitMQ/userSignupSubscriber";
import express from "express";
import { startBookingCancelledSubscriber } from "./src/rabbitMQ/bookingCancelSubscriber";

dotenv.config();

startEventCreatedSubscriber().catch(console.error);
startPaymentResultSubscriber().catch(console.error);
startUserSignupSubscriber().catch(console.error);
startBookingCancelledSubscriber().catch(console.error);

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.status(200).send("OK"));

app.listen(process.env.PORT || 3003, () => {
  console.log(
    `Notifications service is listening on the port ${process.env.PORT || 3003}`
  );
});
