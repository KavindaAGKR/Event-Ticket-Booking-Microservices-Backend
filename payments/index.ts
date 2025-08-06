import express from "express";
import dotenv from "dotenv";
import { startBookingCreatedSubscriber } from "./src/rabbitMQ/subscriber";
import paymentRoutes from "./src/routes/paymentRoutes";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/payments", paymentRoutes);

app.listen(3004, () => {
  console.log("Payment service listening on port 3004");
  startBookingCreatedSubscriber().catch(console.error);
});
