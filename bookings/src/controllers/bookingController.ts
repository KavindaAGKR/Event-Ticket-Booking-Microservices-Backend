import { Request, Response } from "express";
import {
  cancelBookingService,
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
} from "../services/bookingServices";
import { publishBookingCreated } from "../rabbitMQ/publisher";
import { publishBookingCancelled } from "../rabbitMQ/bookingCancelPublisher";

export const pendingResponses = new Map<number, Response>();

//Create a booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;
    const userName = req.username;
    const response = await createBookingService(bookingData, userName);

    // Store response for later
    pendingResponses.set(response.id, res);

    const newBookingData = {
      ...response,
      cardDetails: bookingData.cardDetails,
      customerId: userName,
    };
    console.log("New booking created:", newBookingData);
    // Publish booking created event
    await publishBookingCreated({
      newBookingData,
    });
  } catch (err) {
    res.status(500).json({ status: "FAILED", message: err.message });
  }
};

//Get all bookings of a user
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const userName = req.username;
    const bookings = await getAllBookingsService(userName);
    res.status(200).json({
      status: "SUCCESS",
      message: "Bookings retrieved successfully latest bookings",
      data: bookings,
      note: "This is commited newly to identify bookings deployed"
    });
  } catch (err) {
    res.status(500).json({ status: "FAILED", message: err.message });
  }
};

// Get booking by ID
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id, 10);
    const booking = await getBookingByIdService(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Booking not found" });
    }
    res.status(200).json({
      status: "SUCCESS",
      message: "Booking retrieved successfully",
      data: booking
      
    });
  } catch (err) {
    res.status(500).json({ status: "FAILED", message: err.message });
  }
};

//cancel booking
export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id, 10);
    const { booking } = req.body;
    console.log("Cancelling booking with ID:", bookingId, "Data:", booking);
    const response = await cancelBookingService(bookingId);
    if (!response) {
      return res.status(404).json({
        status: "FAILED",
        message: "Booking not found or already cancelled",
      });
    }

    await publishBookingCancelled({ booking });
    res.status(200).json({
      status: "SUCCESS",
      message: "Booking cancelled successfully",
      data: response,
    });
  } catch (err) {
    res.status(500).json({ status: "FAILED", message: err.message });
  }
};
