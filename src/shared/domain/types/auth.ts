/* eslint-disable @typescript-eslint/no-namespace */
import { User as UserModel } from '#domain/types/user';
export namespace Auth {
  export interface ProviderUser {
    sub: string;
    email: string;
    name: string;
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

  export interface User extends UserModel.Entity {
    token: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
  }
}
