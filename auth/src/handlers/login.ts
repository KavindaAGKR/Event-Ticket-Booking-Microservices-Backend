import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import userLoginService from "../services/loginService";

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const { email, password } = JSON.parse(event.body || "{}");

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: "FAILED",
          message: "Please provide both email and password.",
        }),
      };
    }

    const response = await userLoginService(email, password);

    return {
      statusCode: 200,
      cookies: [
        `refreshToken=${
          response.refreshToken
        }; HttpOnly; SameSite=None; Secure; Path=/user/refresh; Max-Age=${
          24 * 60 * 60
        }`,
      ],
      body: JSON.stringify({
        status: "SUCCESS",
        message: "Login successful.",
        data: response,
      }),
    };
  } catch (err) {
    const error = err as Error;
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "FAILED",
        message: error.message || "An unexpected error occurred.",
      }),
    };
  }
}

export default handler;
