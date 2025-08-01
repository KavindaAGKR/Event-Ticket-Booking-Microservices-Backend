import { APIGatewayProxyResult } from "aws-lambda";

async function handler(): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World!",
    }),
  };
}

export default handler;
