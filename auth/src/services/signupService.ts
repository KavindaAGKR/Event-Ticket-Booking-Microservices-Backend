
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import crypto from 'crypto';

/**
 * Service function to handle user signup in the Cognito user pool.
 * @param email - The email address of the user signing up.
 * @param password - The password for the user account.
 * @returns - A promise that resolves to the Cognito signup response object.
 */
async function UserSignupService(
  email: string,
  password: string,
): Promise<object> {
  if (!process.env.COGNITO_REGION) {
    throw new Error('COGNITO_REGION environment variable is not set');
  }
  const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.COGNITO_REGION,
  });

  const calculateSecretHash = (username: string): string => {
    return crypto
      .createHmac('SHA256', process.env.COGNITO_APP_CLIENT_SECRET!)
      .update(username + process.env.COGNITO_APP_CLIENT_ID)
      .digest('base64');
  };

  const command = new SignUpCommand({
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    Username: email,
    Password: password,
    SecretHash: process.env.COGNITO_APP_CLIENT_SECRET
      ? calculateSecretHash(email)
      : undefined,
  });
  const response = await cognitoClient.send(command);

  return response;
}

export default UserSignupService;
