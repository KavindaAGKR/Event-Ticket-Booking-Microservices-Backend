import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

export default async function refreshService(
  refreshToken: string,
  cognitoPool: { clientId: string; region: string; clientSecret?: string },
): Promise<{ accessToken: string; idToken: string }> {
  const cognitoClient = new CognitoIdentityProviderClient({
    region: cognitoPool.region,
  });

  const command = new InitiateAuthCommand({
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: cognitoPool.clientId,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      SECRET_HASH: cognitoPool.clientSecret!,
    },
  });

  const response = await cognitoClient.send(command);

  return {
    accessToken: response.AuthenticationResult?.AccessToken ?? '',
    idToken: response.AuthenticationResult?.IdToken ?? '',
  };
}
