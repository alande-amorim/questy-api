import { Auth } from '#domain/types/auth';
import {
  AdminCreateUserCommandOutput,
  GetUserCommandOutput,
  InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

export interface ICognitoService {
  createUser(input: Auth.SignupRequest): Promise<AdminCreateUserCommandOutput>;
  signUp(input: Auth.SignupRequest): Promise<void>;
  confirmSignUp(input: Auth.ConfirmSignupRequest): Promise<void>;
  signIn(input: Auth.SignInRequest): Promise<InitiateAuthCommandOutput>;
  getUser(token: string): Promise<GetUserCommandOutput>;
}
