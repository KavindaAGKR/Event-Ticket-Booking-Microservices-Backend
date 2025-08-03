import dotenv from "dotenv";
dotenv.config();
import { startBookingCreatedSubscriber } from "./rabbitMQ/subscriber";

startBookingCreatedSubscriber().catch(console.error);
