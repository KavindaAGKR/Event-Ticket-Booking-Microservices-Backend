import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getAllOrganizerEvents,
  getEventById,
  updateEvent,
} from "../controllers/eventController";
import { validateAuth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", validateAuth, createEvent);
router.get("/get-all-events", getAllEvents);
router.get("/my-events", validateAuth, getAllOrganizerEvents);

router.get("/:id", getEventById);

router.put("/:id", validateAuth, updateEvent);
router.delete("/:id", validateAuth, deleteEvent);
router.get("/health", (req, res) => res.status(200).send("OK"));

export default router;
