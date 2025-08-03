import { Request, Response } from "express";
import { processPayment } from "../services/paymentService";

export async function handleManualPayment(req: Request, res: Response) {
  try {
    const booking = req.body;
    await processPayment(booking);
    res.status(200).json({ message: "Payment processed successfully." });
  } catch (err) {
    res.status(400).json({ error: "Payment failed." });
  }
}
