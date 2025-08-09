import { Router } from "express";
import { handleManualPayment } from "../controllers/paymentController";
import { validateAuth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/pay",validateAuth, handleManualPayment);
router.get("/health", (req, res) => res.status(200).send("OK"));


export default router;
