

import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import refreshService from "../services/refresh.js";

/**
 * Lambda handler function to refresh access and ID tokens.
 * @param event - The event containing the request data.
 * @returns The result of the API Gateway proxy integration.
 * @async
 */
export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const refreshToken =
      event.cookies
        ?.find((cookie) => cookie.startsWith("refreshToken="))
        ?.split("=")[1] ||
      event.headers["refresh-token"] ||
      event.headers["Refresh-Token"];

    if (!refreshToken) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          status: "FAILED",
          message: "Refresh token not provided.",
        }),
      };
    }

    const cognitoPool = {
      clientId: process.env.COGNITO_APP_CLIENT_ID!,
      region: process.env.COGNITO_REGION!,
      clientSecret: process.env.COGNITO_APP_CLIENT_SECRET!,
    };

    const response = await refreshService(refreshToken, cognitoPool);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "SUCCESS",
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
