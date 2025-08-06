import { Router } from "express";
import { handleManualPayment } from "../controllers/paymentController";
import { validateAuth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/pay",validateAuth, handleManualPayment);

export default router;
