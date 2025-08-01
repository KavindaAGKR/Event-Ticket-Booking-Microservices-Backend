import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";
import AWS from "aws-sdk";

async function UserSignupService(
  email: string,
  password: string,
  groupName?: string
): Promise<object> {
  const cognito = new AWS.CognitoIdentityServiceProvider();

  const appClientId = process.env.COGNITO_APP_CLIENT_ID;
  const appClientSecret = process.env.COGNITO_APP_CLIENT_SECRET;
  const cognitoRegion = process.env.COGNITO_REGION;
  const userPoolId = process.env.COGNITO_USER_POOL_ID;

  if (!cognitoRegion) {
    throw new Error("COGNITO_REGION environment variable is not set");
  }
  const cognitoClient = new CognitoIdentityProviderClient({
    region: cognitoRegion,
  });

  const calculateSecretHash = (username: string): string => {
    return crypto
      .createHmac("SHA256", appClientSecret!)
      .update(username + appClientId)
      .digest("base64");
  };



  const command = new SignUpCommand({
    ClientId: appClientId,
    Username: email,
    Password: password,
    SecretHash: appClientSecret ? calculateSecretHash(email) : undefined,
  });
  const response = await cognitoClient.send(command);

  if (!groupName) {
    groupName = "user";
  }
  try {
      const cmd = new AdminAddUserToGroupCommand({
    UserPoolId: userPoolId!,
    Username: email,
    GroupName: groupName,
  });
  
    await cognitoClient.send(cmd);
  } catch (error) {
    throw new Error(`Error adding user to group: ${error}`);
  }

  return response;
}

export default UserSignupService;
