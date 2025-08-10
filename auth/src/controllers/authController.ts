import { Request, Response } from "express";
import UserSignupService from "../services/signupService";
import userLoginService from "../services/loginService";
import refreshService from "../services/refresh";
import userVerifyEmailService from "../services/emailVerificationService";
import { publishUserSignup } from "../rabbitMQ/publisher";

// User signup controller
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, groupName, name, phone } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        status: "FAILED",
        message: "Please complete the required fields.",
      });
    }

    const newUser = await UserSignupService(email, password, groupName, name, phone);

    res.status(201).json({
      status: "SUCCESS",
      message:
        "User signed up successfully. Please check your email for verification code.",
      data: {
        userSub: (newUser as any).UserSub,
        email: email,
        emailVerificationRequired: true,
      },
    });
  } catch (error) {
    const e = error as Error & { code?: number };
    const errorMessage = e.message;

    res.status(500).json({
      status: "FAILED",
      message: errorMessage,
    });
  }
};

// User login controller
export const login = async (req: Request, res: Response) => {
  try {
    // Add this debug line
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "FAILED",
        message: "Please provide both email and password.",
      });
    }

    const response = await userLoginService(email, password);

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/user/refresh",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "SUCCESS",
      message: "Login successful.",
      data: response,
    });
  } catch (error) {
    const e = error as Error;
    res.status(500).json({
      status: "FAILED",
      message: e.message || "An unexpected error occurred.",
    });
  }
};

// Token refresh controller
export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken =
      req.cookies?.refreshToken ||
      req.headers["refresh-token"] ||
      req.headers["Refresh-Token"];

    if (!refreshToken) {
      return res.status(401).json({
        status: "FAILED",
        message: "Refresh token not provided.",
      });
    }

    const cognitoPool = {
      clientId: process.env.COGNITO_APP_CLIENT_ID!,
      region: process.env.COGNITO_REGION!,
      clientSecret: process.env.COGNITO_APP_CLIENT_SECRET!,
    };

    const response = await refreshService(refreshToken, cognitoPool);

    res.status(200).json({
      status: "SUCCESS",
      data: response,
    });
  } catch (error) {
    const e = error as Error;
    res.status(500).json({
      status: "FAILED",
      message: e.message || "An unexpected error occurred.",
    });
  }
};

// Email verification controller
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        status: "FAILED",
        message: "Please provide both email and verification code.",
      });
    }

    await userVerifyEmailService(email, code);
    // Publish event to RabbitMQ
    await publishUserSignup({
      email: email,
    });
    res.status(200).json({
      status: "SUCCESS",
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    const e = error as Error;
    res.status(500).json({
      status: "FAILED",
      message: e.message || "Email verification failed.",
    });
  }
};
