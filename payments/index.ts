import express from "express";
import dotenv from "dotenv";
import { startBookingCreatedSubscriber } from "./src/rabbitMQ/subscriber";
import paymentRoutes from "./src/routes/paymentRoutes";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:4000", "https://cloud.cisk.site"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/payments", paymentRoutes);

app.listen(3004, () => {
  console.log("Payment service listening on port 3004");
  startBookingCreatedSubscriber().catch(console.error);
});
