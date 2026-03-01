import {
  CognitoIdentityProviderClient,
  UpdateUserAttributesCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.COGNITO_REGION || "ap-southeast-1",
});

export const updateUserDetailsService = async (
  accessToken: string, 
  newName: string
) => {
  try {
        const command = new UpdateUserAttributesCommand({
      AccessToken: accessToken,
      UserAttributes: [
        {
          Name: "name",
          Value: newName,
        },
      ],
    });

    const result = await cognitoClient.send(command);

    return {
      success: true,
      message: "User name updated successfully",
      data: result,
    };
  } catch (error: any) {
    console.error("Error updating user name:", error);

    if (error.name === "NotAuthorizedException") {
      throw new Error("Invalid or expired access token");
    } else if (error.name === "InvalidParameterException") {
      throw new Error("Invalid parameters provided");
    }

    throw new Error(`Failed to update user name: ${error.message}`);
  }
};
