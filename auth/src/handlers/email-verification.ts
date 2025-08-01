import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import userVerifyEmailService from "../services/emailVerificationService.js";


const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { email, code } = event.body ? JSON.parse(event.body) : null;
    if (!email || !code) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: "FAILED",
          message: "Missing email or code in the request",
        }),
      };
    }

    await userVerifyEmailService(email, code);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "SUCCESS",
        message: "User verified successfully",
      }),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "FAILED",
        message: "Internal server error",
      }),
    };
  }
};

export default handler;
