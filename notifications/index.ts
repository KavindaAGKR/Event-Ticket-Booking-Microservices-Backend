import dotenv from "dotenv";
import { startEventCreatedSubscriber } from "./src/rabbitMQ/eventCreatedSubscriber";
import { startPaymentResultSubscriber } from "./src/rabbitMQ/paymentResultSubscriber";
import { start } from "repl";

dotenv.config();

startEventCreatedSubscriber().catch(console.error);
startPaymentResultSubscriber().catch(console.error);
