import { Request, Response } from "express";
import { processPayment } from "../services/paymentService";

export async function handleManualPayment(req: Request, res: Response) {
  try {
    const booking = req.body;
    const customerId = req.username;
    booking .customerId = customerId;
    console.log("Received booking data:", booking);
    await processPayment(booking);
    res.status(200).json({status:"SUCCESS", message: "Payment processed successfully." });
  } catch (err) {
    res.status(400).json({ status: "FAILED", message: "Payment failed." + err.message });
  }
}
