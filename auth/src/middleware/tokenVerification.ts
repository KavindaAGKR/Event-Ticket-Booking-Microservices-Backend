/**
 * @file AWS Cognito Token Verification Middleware
 * @description Provides functions to verify JWT tokens from AWS Cognito and extract the user ID.
 * This file was created on 2024-11-22 and last updated on 2024-12-06.
 * @copyright Builtapps Business Solutions 2024
 * @author Thusitha <thusitha.builtapps@gmail.com>
 * @version 1.0.0
 */

import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { JwtPayload } from 'jsonwebtoken';

/**
 * Verifies a JWT token from an authorization header and returns the decoded payload.
 * @param token - The JWT token (access or ID token) to verify.
 * @param tokenType - The type of token ('access' or 'id').
 * @param userPoolId - The AWS Cognito user pool ID.
 * @param clientId - The AWS Cognito app client ID.
 * @returns A promise that resolves with the decoded token payload if valid.
 * @throws An error if the token is missing or invalid.
 */
interface CognitoPool {
  tokenType: 'access' | 'id';
  userPoolId: string;
  clientId: string;
}

const verifyToken = async (
  token: string,
  cognitoPool: CognitoPool,
): Promise<JwtPayload> => {
  const { tokenType, userPoolId, clientId } = cognitoPool;
  if (!token) {
    throw new Error('Missing access token.');
  }

  const verifier = CognitoJwtVerifier.create({
    userPoolId,
    clientId,
    tokenUse: tokenType,
  });

  try {
    const payload = await verifier.verify(token);
    return payload;
  } catch {
    throw new Error('Invalid access token.');
  }
};

export default verifyToken;
