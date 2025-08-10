import dotenv from "dotenv";
import { startEventCreatedSubscriber } from "./src/rabbitMQ/eventCreatedSubscriber";
import { startPaymentResultSubscriber } from "./src/rabbitMQ/paymentResultSubscriber";
import { startUserSignupSubscriber } from "./src/rabbitMQ/userSignupSubscriber";
dotenv.config();

startEventCreatedSubscriber().catch(console.error);
startPaymentResultSubscriber().catch(console.error);
startUserSignupSubscriber().catch(console.error);

import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.status(200).send("OK"));

app.listen(process.env.PORT || 3003, () => {
  console.log(
    `Notifications service running on port ${process.env.PORT || 3000}`
  );
});
