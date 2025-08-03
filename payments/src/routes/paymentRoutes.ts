import { Router } from "express";
import { handleManualPayment } from "../controllers/paymentController";

const router = Router();

router.post("/pay", handleManualPayment);

export default router;
