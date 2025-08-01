
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserSignupService from "../services/signupService.js";


export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const { email, password , groupName} = event.body ? JSON.parse(event.body) : {};

  if (!email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "FAILED",
        message: "Please complete the required fields.",
      }),
    };
  }

  try {
    const newUser = await UserSignupService(email, password, groupName);

    return {
      statusCode: 201,
      body: JSON.stringify({
        status: "SUCCESS",
        message: "User signed up successfully",
        data: newUser,
      }),
    };
  } catch (error) {
    const e = error as Error & { code?: number };
    const statusCode = 500;
    const errorMessage = e.message;

    return {
      statusCode,
      body: JSON.stringify({
        status: "FAILED",
        message: errorMessage,
      }),
    };
  }
}

export default handler;
