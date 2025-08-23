import express from "express";
import eventRoutes from "./src/routes/eventRoutes";
import dotenv from "dotenv";
import { startPaymentResultSubscriber } from "./src/rabbitMQ/paymentResultSubscriber";
import cors from "cors";
import { startBookingCancelledSubscriber } from "./src/rabbitMQ/bookingCancelSubscriber";

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "https://cloud.cisk.site",
      "https://cloud-api.cisk.site", 
      "https://myevents.cisk.site"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/events", eventRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

startPaymentResultSubscriber();
startBookingCancelledSubscriber();
