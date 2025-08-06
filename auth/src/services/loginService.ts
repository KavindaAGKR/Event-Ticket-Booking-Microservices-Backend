import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";

const region = process.env.COGNITO_REGION;
// if (!region) {
//   throw new Error("COGNITO_REGION environment variable is not set");
// }
const cognitoClient = new CognitoIdentityProviderClient({
  region,
});

export default async function userLoginService(
  email: string,
  password: string
): Promise<{ idToken: string; accessToken: string; refreshToken: string }> {
  const authParams: Record<string, string> = {
    USERNAME: email,
    PASSWORD: password,
    SECRET_HASH: calculateSecretHash(email),
  };

  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_APP_CLIENT_ID!,
    AuthParameters: authParams,
  });

  const response = await cognitoClient.send(command);
  return {
    idToken: response.AuthenticationResult?.IdToken ?? "",
    accessToken: response.AuthenticationResult?.AccessToken ?? "",
    refreshToken: response.AuthenticationResult?.RefreshToken ?? "",
  };
}

function calculateSecretHash(username: string): string {
  return crypto
    .createHmac("SHA256", process.env.COGNITO_APP_CLIENT_SECRET!)
    .update(username + process.env.COGNITO_APP_CLIENT_ID!)
    .digest("base64");
}
