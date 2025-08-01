import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import crypto from 'crypto';

async function userVerifyEmailService(
  email: string,
  code: string,
): Promise<void> {
  const client = new CognitoIdentityProviderClient({});
  const secretHash = crypto
    .createHmac('SHA256', process.env.COGNITO_APP_CLIENT_SECRET!)
    .update(email + process.env.COGNITO_APP_CLIENT_ID)
    .digest('base64');

  const command = new ConfirmSignUpCommand({
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    SecretHash: secretHash,
    Username: email,
    ConfirmationCode: code,
  });

  await client.send(command);
}

export default userVerifyEmailService;
