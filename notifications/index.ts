import dotenv from "dotenv";
import { startEventCreatedSubscriber } from "./src/rabbitMQ/eventCreatedSubscriber";
import { startPaymentResultSubscriber } from "./src/rabbitMQ/paymentResultSubscriber";
import { startUserSignupSubscriber } from "./src/rabbitMQ/userSignupSubscriber";
dotenv.config();

startEventCreatedSubscriber().catch(console.error);
startPaymentResultSubscriber().catch(console.error);
startUserSignupSubscriber().catch(console.error);
