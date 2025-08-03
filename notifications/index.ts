import dotenv from "dotenv";
import { startEventCreatedSubscriber } from "./src/rabbitmq/subscriber";

dotenv.config();

startEventCreatedSubscriber().catch(console.error);
