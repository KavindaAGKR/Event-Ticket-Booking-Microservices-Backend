import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
} from "../controllers/eventController";
import { validateAuth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", validateAuth, createEvent);
router.get("/get-all-events", validateAuth, getAllEvents);
router.get("/:id", validateAuth, getEventById);


router.get("/health", (req, res) => res.status(200).send("OK"));

export default router;
