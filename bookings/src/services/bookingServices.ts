import prisma from "../config/database";

// Create a booking service
export const createBookingService = async (
  bookingData: any,
  customerId: string
) => {
  return await prisma.booking.create({
    data: {
      eventId: bookingData.eventId,
      eventName: bookingData.eventName,
      eventPrice: bookingData.eventPrice,
      customerId: customerId, // Cognito username
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      numberOfTickets: bookingData.numberOfTickets,
      totalAmount: bookingData.totalAmount,
      status: bookingData.status || "PENDING",
      paymentStatus: bookingData.paymentStatus || "PENDING",
      paymentMethod: bookingData.paymentMethod,
      bookingDate: bookingData.bookingDate,
    },
  });
};

export const updateBookingPaymentStatus = async (bookingData) => {
  try {
    await prisma.booking.update({
      where: {
        id: bookingData.id,
      },
      data: bookingData,
    });
  } catch (error) {
    throw new Error(
      "Failed to update booking payment status: " + error.message
    );
    console.error("Error updating booking payment status:", error);
  }
};

// Get all bookings service
export const getAllBookingsService = async (customerId: string) => {
  return await prisma.booking.findMany({
    where: {
      customerId: customerId,
    },
  });
};

// Get booking by ID service
export const getBookingByIdService = async (bookingId: number) => {
  return await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });
};

// Cancel booking service
export const cancelBookingService = async (bookingId: number) => {
  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CANCELLED",
    },
  });
};

