/* eslint-disable @typescript-eslint/no-namespace */
export namespace Auth {
  export interface CognitoUser {
    sub: string;
    email: string;
    name: string;
    email_verified: boolean;
    cognito: {
      username: string;
      groups: string[];
    };
  }

  export interface JwtPayload {
    sub: string;
    email: string;
    name: string;
    email_verified: boolean;
    cognito: {
      username: string;
      groups: string[];
    };
    iat: number;
    exp: number;
  }

  export interface SignInRequest {
    email: string;
    password: string;
  }

  export interface SignupRequest {
    name: string;
    email: string;
    password: string;
  }

  export interface ConfirmSignupRequest {
    email: string;
    code: string;
  }

  export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    idToken: string;
    expiresIn: number;
    tokenType: string;
  }
}
