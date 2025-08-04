import dotenv from "dotenv";
dotenv.config();
import { startBookingCreatedSubscriber } from "./src/rabbitMQ/subscriber";

startBookingCreatedSubscriber().catch(console.error);
