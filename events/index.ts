import express from "express";
import eventRoutes from "./src/routes/eventRoutes";
import dotenv from "dotenv";
import { startPaymentResultSubscriber } from "./src/rabbitMQ/paymentResultSubscriber";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/events", eventRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

startPaymentResultSubscriber();
