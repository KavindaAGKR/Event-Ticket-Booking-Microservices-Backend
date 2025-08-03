import { Request, Response } from "express";
import {
  cancelBookingService,
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
} from "../services/bookingServices";

//Create a booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;
    const userName = req.username;
    const response = await createBookingService(bookingData, userName);

    res.status(201).json({
      status: "SUCCESS",
      message: "Booking created successfully",
      data: response,
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
      message: "Bookings retrieved successfully",
      data: bookings,
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
    res
      .status(200)
      .json({
        status: "SUCCESS",
        message: "Booking retrieved successfully",
        data: booking,
      });
  } catch (err) {
    res.status(500).json({ status: "FAILED", message: err.message });
  }
};


//cancel booking
export const cancelBooking = async (req: Request, res: Response) => {
  try{
    const bookingId = parseInt(req.params.id, 10);
    const response = await cancelBookingService(bookingId);
    if (!response) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Booking not found or already cancelled" });
    }
    res.status(200).json({
      status: "SUCCESS",
      message: "Booking cancelled successfully",
      data: response,
    });
  }catch (err) {
    res.status(500).json({ status: "FAILED", message: err.message });
  }
}