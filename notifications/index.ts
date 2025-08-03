import dotenv from "dotenv";
dotenv.config();

import { startEventCreatedSubscriber } from "./src/rabbitmq/subscriber";

startEventCreatedSubscriber().catch(console.error);
