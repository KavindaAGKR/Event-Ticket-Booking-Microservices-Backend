import { Router } from "express";
import {
  signup,
  login,
  refresh,
  verifyEmail,
} from "../controllers/authController";

const router = Router();
console.log("Auth routes initialized");
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/verify-email", verifyEmail);

router.get("/health", (req, res) => res.status(200).send("OK"));

export default router;
