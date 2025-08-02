import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

declare global {
  namespace Express {
    interface Request {
      username?: string;
      user?: any;
      userRole?: string[];
    }
  }
}

const userPoolId = process.env.COGNITO_USER_POOL_ID;
const region = process.env.COGNITO_REGION;

const client = jwksClient({
  jwksUri: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
});

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      status: "FAILED",
      message: "Authorization header is missing",
    });
  }
  const token = authHeader.replace("Bearer ", "");
  jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({
        status: "FAILED",
        message: "Invalid or expired token",
      });
    }
    req.username = decoded["username"];
    req.userRole = decoded["cognito:groups"] || [];
    next();
  });
};
