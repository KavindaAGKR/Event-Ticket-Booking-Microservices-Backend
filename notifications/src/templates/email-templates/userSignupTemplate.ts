export interface UserSignupData {
  email: string;
  firstName?: string;
  lastName?: string;
}

export function userSignupTemplate(userData: UserSignupData | string) {
  // Handle both string email and UserSignupData object
  const email = typeof userData === "string" ? userData : userData.email;
  const firstName = typeof userData === "object" ? userData.firstName : "";
  const displayName = firstName || email.split("@")[0];

  return {
    subject: `🎉 Welcome to EventBooker - Your Account is Ready!`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to EventBooker</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden;">
                
                <!-- Header Section -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                      🎭 EventBooker
                    </h1>
                    <p style="color: #e8f0ff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                      Your Gateway to Amazing Events
                    </p>
                  </td>
                </tr>

                <!-- Welcome Message -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                      <div style="background: linear-gradient(135deg, #667eea, #764ba2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; position: relative;">
                        <span style="font-size: 40px; color: white;">🎉</span>
                      </div>
                      <h2 style="color: #2d3748; margin: 0 0 10px 0; font-size: 28px; font-weight: 600;">
                        Welcome, ${displayName}!
                      </h2>
                      <p style="color: #718096; font-size: 16px; margin: 0; line-height: 1.5;">
                        Your account has been successfully created
                      </p>
                    </div>

                    <div style="background: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #667eea;">
                      <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                        🚀 You're all set to explore!
                      </h3>
                      <p style="color: #4a5568; margin: 0; line-height: 1.6; font-size: 15px;">
                        Thank you for joining EventBooker! You now have access to thousands of exciting events, 
                        from concerts and festivals to workshops and networking events. Get ready to discover 
                        experiences that will create lasting memories.
                      </p>
                    </div>

                    <!-- What's Next Section -->
                    <div style="margin-bottom: 30px;">
                      <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; text-align: center;">
                        🎯 What's Next?
                      </h3>
                      
                      <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                        <div style="flex: 1; min-width: 250px; background: #fff; border: 2px solid #e2e8f0; border-radius: 10px; padding: 20px; text-align: center; transition: all 0.3s ease;">
                          <div style="font-size: 30px; margin-bottom: 10px;">🔍</div>
                          <h4 style="color: #2d3748; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Browse Events</h4>
                          <p style="color: #718096; margin: 0; font-size: 14px; line-height: 1.4;">
                            Discover events happening near you or explore virtual experiences from around the world.
                          </p>
                        </div>
                        
                        <div style="flex: 1; min-width: 250px; background: #fff; border: 2px solid #e2e8f0; border-radius: 10px; padding: 20px; text-align: center;">
                          <div style="font-size: 30px; margin-bottom: 10px;">🎫</div>
                          <h4 style="color: #2d3748; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Book Tickets</h4>
                          <p style="color: #718096; margin: 0; font-size: 14px; line-height: 1.4;">
                            Secure your spot at amazing events with our fast and secure booking system.
                          </p>
                        </div>
                      </div>
                      
                      <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                        <div style="flex: 1; min-width: 250px; background: #fff; border: 2px solid #e2e8f0; border-radius: 10px; padding: 20px; text-align: center;">
                          <div style="font-size: 30px; margin-bottom: 10px;">👥</div>
                          <h4 style="color: #2d3748; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Connect</h4>
                          <p style="color: #718096; margin: 0; font-size: 14px; line-height: 1.4;">
                            Meet like-minded people and build your network at events you love.
                          </p>
                        </div>
                        
                        <div style="flex: 1; min-width: 250px; background: #fff; border: 2px solid #e2e8f0; border-radius: 10px; padding: 20px; text-align: center;">
                          <div style="font-size: 30px; margin-bottom: 10px;">⭐</div>
                          <h4 style="color: #2d3748; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Create Events</h4>
                          <p style="color: #718096; margin: 0; font-size: 14px; line-height: 1.4;">
                            Host your own events and bring your community together.
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Account Details -->
                    <div style="background: #edf2f7; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                      <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                        📧 Account Details
                      </h3>
                      <p style="color: #4a5568; margin: 0 0 5px 0; font-size: 14px;">
                        <strong>Email:</strong> ${email}
                      </p>
                      <p style="color: #4a5568; margin: 0; font-size: 14px;">
                        <strong>Account Status:</strong> <span style="color: #38a169; font-weight: 600;">Active ✓</span>
                      </p>
                    </div>

                    <!-- CTA Button -->
                    <div style="text-align: center; margin-bottom: 30px;">
                      <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                        🎭 Start Exploring Events
                      </a>
                    </div>

                    <!-- Support Info -->
                    <div style="background: #f7fafc; border-radius: 8px; padding: 20px; text-align: center;">
                      <p style="color: #718096; margin: 0 0 10px 0; font-size: 14px;">
                        Need help getting started? Our support team is here for you!
                      </p>
                      <a href="mailto:support@eventbooker.com" style="color: #667eea; text-decoration: none; font-weight: 600;">
                        📧 support@eventbooker.com
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #2d3748; padding: 25px 30px; text-align: center;">
                    <p style="color: #a0aec0; margin: 0 0 10px 0; font-size: 14px;">
                      Follow us for the latest events and updates:
                    </p>
                    <div style="margin-bottom: 15px;">
                      <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px; font-size: 24px;">📘</a>
                      <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px; font-size: 24px;">🐦</a>
                      <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px; font-size: 24px;">📷</a>
                      <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px; font-size: 24px;">💼</a>
                    </div>
                    <p style="color: #718096; margin: 0; font-size: 12px;">
                      © ${new Date().getFullYear()} EventBooker. All rights reserved.<br>
                      This email was sent to ${email}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };
}
