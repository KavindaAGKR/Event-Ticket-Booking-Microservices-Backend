export interface BookingCancelData {
  booking: {
    id: number;
    bookingRef: string;
    eventId: number;
    eventName: string;
    eventPrice: number;
    customerId: string;
    customerName: string;
    customerEmail: string;
    numberOfTickets: number;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    paymentId?: string | null;
    bookingDate: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function bookingCancelledTemplate(bookingData: BookingCancelData) {
  const { booking } = bookingData;
  const eventName = booking.eventName;
  const eventDate = new Date(booking.bookingDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const cancelledDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    subject: `Booking Cancelled - ${eventName} | myEvents.lk`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Cancelled - myEvents.lk</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f7fa;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="50" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
          }
          
          .header-content {
            position: relative;
            z-index: 1;
          }
          
          .logo {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 5px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          
          .tagline {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 20px;
          }
          
          .icon {
            width: 70px;
            height: 70px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 30px;
            backdrop-filter: blur(10px);
          }
          
          .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 10px;
          }
          
          .header p {
            font-size: 16px;
            opacity: 0.9;
          }
          
          .content {
            padding: 40px 30px;
          }
          
          .alert-box {
            background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
            border: 1px solid #ffeaa7;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .alert-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #ff6b6b, #ee5a24);
          }
          
          .alert-box h2 {
            color: #856404;
            font-size: 20px;
            margin-bottom: 10px;
            font-weight: 600;
          }
          
          .alert-box p {
            color: #856404;
            font-size: 14px;
            margin: 0;
          }
          
          .booking-details {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 16px;
            padding: 30px;
            margin: 25px 0;
            border: 1px solid #e9ecef;
          }
          
          .booking-details h3 {
            color: #2c3e50;
            font-size: 18px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #3498db;
            font-weight: 600;
          }
          
          .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
          }
          
          .detail-row:last-child {
            border-bottom: none;
          }
          
          .detail-label {
            font-weight: 600;
            color: #495057;
            flex: 1;
            font-size: 14px;
          }
          
          .detail-value {
            font-weight: 500;
            color: #212529;
            flex: 1.5;
            text-align: right;
            font-size: 14px;
          }
          
          .event-image {
            width: 100%;
            max-height: 200px;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 20px;
          }
          
          .refund-info {
            background: linear-gradient(135deg, #10ac84 0%, #00d2d3 100%);
            color: white;
            padding: 25px;
            border-radius: 16px;
            margin: 25px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .refund-info::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><circle cx="30" cy="30" r="20" fill="none" stroke="white" stroke-width="0.5" opacity="0.1"/></svg>');
            animation: rotate 20s linear infinite;
          }
          
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .refund-content {
            position: relative;
            z-index: 1;
          }
          
          .refund-info h3 {
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: 600;
          }
          
          .refund-info p {
            font-size: 14px;
            opacity: 0.95;
            line-height: 1.5;
          }
          
          .support-section {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            margin: 25px 0;
            border: 1px solid #e9ecef;
          }
          
          .support-section h3 {
            color: #2c3e50;
            font-size: 16px;
            margin-bottom: 15px;
          }
          
          .support-section p {
            color: #6c757d;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 15px;
          }
          
          .contact-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 25px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
          }
          
          .contact-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
          }
          
          .footer {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: #ecf0f1;
            padding: 30px;
            text-align: center;
            position: relative;
          }
          
          .footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #ff6b6b, #ee5a24, #ff6b6b);
          }
          
          .footer-logo {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #fff;
          }
          
          .footer h4 {
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: 600;
          }
          
          .footer p {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 8px;
            line-height: 1.5;
          }
          
          .footer-links {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #34495e;
          }
          
          .footer-links a {
            color: #3498db;
            text-decoration: none;
            margin: 0 15px;
            font-size: 14px;
            transition: color 0.3s ease;
          }
          
          .footer-links a:hover {
            color: #2980b9;
            text-decoration: underline;
          }
          
          .footer-copyright {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #34495e;
            font-size: 12px;
            opacity: 0.7;
          }
          
          @media (max-width: 600px) {
            .container {
              margin: 10px;
              border-radius: 12px;
            }
            
            .header, .content, .footer {
              padding: 25px 20px;
            }
            
            .booking-details {
              padding: 20px;
            }
            
            .detail-row {
              flex-direction: column;
              align-items: flex-start;
              padding: 10px 0;
            }
            
            .detail-value {
              text-align: left;
              margin-top: 5px;
              font-weight: 600;
            }
            
            .logo {
              font-size: 24px;
            }
            
            .icon {
              width: 60px;
              height: 60px;
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="header-content">
              <div class="logo">🎭 myEvents.lk</div>
              <div class="tagline">Sri Lanka's Premier Event Platform</div>
              <div class="icon">❌</div>
              <h1>Booking Cancelled</h1>
              <p>Your event booking has been successfully cancelled</p>
            </div>
          </div>
          
          <!-- Content -->
          <div class="content">
            <div class="alert-box">
              <h2>✅ Cancellation Confirmed</h2>
              <p>We've received your cancellation request and it has been processed successfully.</p>
            </div>
            
            <!-- Booking Details -->
            <div class="booking-details">
              <h3>📋 Cancelled Booking Details</h3>
              
              <div class="detail-row">
                <span class="detail-label">Booking Reference:</span>
                <span class="detail-value">#${
                  booking.bookingRef || booking.id
                }</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Customer Name:</span>
                <span class="detail-value">${booking.customerName}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Event Name:</span>
                <span class="detail-value">${eventName}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Event Date:</span>
                <span class="detail-value">${eventDate}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Ticket Price:</span>
                <span class="detail-value">LKR ${booking.eventPrice}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Number of Tickets:</span>
                <span class="detail-value">${booking.numberOfTickets}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Total Amount:</span>
                <span class="detail-value">LKR ${booking.totalAmount}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Original Booking Date:</span>
                <span class="detail-value">${new Date(
                  booking.bookingDate
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Cancelled On:</span>
                <span class="detail-value">${cancelledDate}</span>
              </div>
            </div>
            
            <!-- Refund Information -->
            <div class="refund-info">
              <div class="refund-content">
                <h3>💰 Refund Information</h3>
                <p>Your refund of <strong>LKR ${
                  booking.totalAmount
                }</strong> is being processed and will be credited back to your original payment method within <strong>5-7 business days</strong>.</p>
                <p style="margin-top: 10px; font-size: 13px;">You will receive a separate email confirmation once the refund has been processed.</p>
              </div>
            </div>
            
            <!-- Support Section -->
            <div class="support-section">
              <h3>🤝 Need Assistance?</h3>
              <p>If you have any questions about this cancellation or need help finding other events, our support team is here to help.</p>
              <a href="mailto:support@myevents.lk" class="contact-button">Contact Support</a>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div class="footer-logo">🎭 myEvents.lk</div>
            <h4>Thank You for Using myEvents.lk</h4>
            <p>We're sorry to see this booking cancelled, but we hope to serve you again soon.</p>
            <p>Discover amazing events happening across Sri Lanka on our platform.</p>
            
            <div class="footer-links">
              <a href="https://myevents.lk">Browse Events</a>
              <a href="https://myevents.lk/contact">Contact Support</a>
              <a href="https://myevents.lk/faq">FAQ</a>
              <a href="https://myevents.lk/help">Help Center</a>
            </div>
            
            <div class="footer-copyright">
              <p>&copy; 2025 myEvents.lk. All rights reserved. | Sri Lanka's Premier Event Platform</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}
