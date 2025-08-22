import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookingRoutes from "./src/routes/bookingRoutes";
import { startPaymentResultSubscriber } from "./src/rabbitMQ/paymentResultSubscriber";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:4000", "https://cloud.cisk.site"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);



app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

startPaymentResultSubscriber();
