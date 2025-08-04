export function paymentResultTemplate(paymentData: any) {
  const { booking, paymentStatus } = paymentData;
  const isSuccess = paymentStatus === "success";
  return {
    subject: isSuccess
      ? `✅ Payment Confirmed for ${booking.eventName}!`
      : `❌ Payment Failed for ${booking.eventName}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #e0f7fa 0%, #fff 100%); padding: 32px; border-radius: 16px; box-shadow: 0 4px 24px rgba(44, 62, 80, 0.08); max-width: 600px; margin: auto;">
        <div style="text-align:center;">
          <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Ticket" style="width:80px; margin-bottom:16px;" />
          <h1 style="color: ${
            isSuccess ? "#2ecc40" : "#e74c3c"
          }; margin-bottom:8px;">
            ${isSuccess ? "Payment Successful!" : "Payment Failed"}
          </h1>
          <p style="font-size:1.2em; color:#333; margin-bottom:24px;">
            ${
              isSuccess
                ? `Thank you, <strong>${booking.customerName}</strong>! Your payment for <strong>${booking.eventName}</strong> is confirmed.`
                : `Sorry, <strong>${booking.customerName}</strong>. Your payment for <strong>${booking.eventName}</strong> could not be processed.`
            }
          </p>
        </div>
        <div style="background:#fff; border-radius:12px; padding:24px; margin-bottom:24px; box-shadow:0 2px 8px rgba(44,62,80,0.05);">
          <h2 style="color:#2d7ff9; margin-bottom:8px;">Booking Details</h2>
          <ul style="list-style:none; padding:0; color:#444; font-size:1em;">
            <li><strong>Booking Reference:</strong> ${booking.bookingRef}</li>
            <li><strong>Event:</strong> ${booking.eventName}</li>
            <li><strong>Date:</strong> ${new Date(
              booking.bookingDate
            ).toLocaleString()}</li>
            <li><strong>Tickets:</strong> ${booking.numberOfTickets}</li>
            <li><strong>Total Amount:</strong> $${booking.totalAmount}</li>
            <li><strong>Payment Method:</strong> ${booking.paymentMethod}</li>
            <li><strong>Status:</strong> <span style="color:${
              isSuccess ? "#2ecc40" : "#e74c3c"
            }; font-weight:bold;">${isSuccess ? "Paid" : "Failed"}</span></li>
          </ul>
        </div>
        ${
          isSuccess
            ? `<div style="text-align:center; margin-top:24px;">
                <span style="font-size:2em; color:#2ecc40;">🎟️</span>
                <p style="color:#333; font-size:1.1em;">Your tickets are confirmed and will be sent to <strong>${booking.customerEmail}</strong> soon.</p>
                <p style="color:#888; font-size:0.95em; margin-top:16px;">Need help? <a href="mailto:support@yourdomain.com" style="color:#2d7ff9;">Contact Support</a></p>
             </div>`
            : `<div style="text-align:center; margin-top:24px;">
                <span style="font-size:2em; color:#e74c3c;">💳</span>
                <p style="color:#333; font-size:1.1em;">Please try again or use a different payment method.</p>
                <p style="color:#888; font-size:0.95em; margin-top:16px;">Need help? <a href="mailto:support@yourdomain.com" style="color:#2d7ff9;">Contact Support</a></p>
             </div>`
        }
        <div style="margin-top:32px; text-align:center; color:#aaa; font-size:0.9em;">
          &copy; ${new Date().getFullYear()} Event Ticket Booking. All rights reserved.
        </div>
      </div>
    `,
  };
}
