import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendEmailNotification(
  to: string,
  subject: string,
  html: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAIL,
      pass: process.env.APP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"MyEvents.lk" <${process.env.NODEMAIL}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent to:", to);
}
