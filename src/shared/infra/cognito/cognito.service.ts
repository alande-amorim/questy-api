import { Auth } from '#domain/types/auth';
import {
  AdminCreateUserCommand,
  AdminCreateUserCommandOutput,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  GetUserCommand,
  GetUserCommandOutput,
  InitiateAuthCommand,
  InitiateAuthCommandOutput,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICognitoService } from '#domain/interfaces/cognito.interface';

@Injectable()
export class CognitoService implements ICognitoService {
  private cognitoClient: CognitoIdentityProviderClient;
  private clientId: string;
  private userPoolId: string;

  constructor(private configService: ConfigService) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.configService.get('AWS_REGION'),
    });
    this.clientId = this.configService.get('COGNITO_CLIENT_ID');
    this.userPoolId = this.configService.get('COGNITO_USER_POOL_ID');
  }

  async signUp(signUpRequest: Auth.SignupRequest): Promise<void> {
    try {
      const command = new SignUpCommand({
        ClientId: this.clientId,
        Username: signUpRequest.email,
        Password: signUpRequest.password,
        UserAttributes: [
          {
            Name: 'name',
            Value: signUpRequest.name,
          },
          {
            Name: 'email',
            Value: signUpRequest.email,
          },
        ],
      });

      await this.cognitoClient.send(command);
    } catch (error) {
      throw new UnauthorizedException('Failed to sign up user');
    }
  }

  async confirmSignUp(
    confirmSignUpRequest: Auth.ConfirmSignupRequest,
  ): Promise<void> {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: this.clientId,
        Username: confirmSignUpRequest.email,
        ConfirmationCode: confirmSignUpRequest.code,
      });

      await this.cognitoClient.send(command);
    } catch (error) {
      throw new UnauthorizedException('Failed to confirm sign up');
    }
  }

  async signIn(
    signInRequest: Auth.SignInRequest,
  ): Promise<InitiateAuthCommandOutput> {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: signInRequest.email,
          PASSWORD: signInRequest.password,
        },
      });

      const response = await this.cognitoClient.send(command);

      if (!response.AuthenticationResult) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getUser(accessToken: string): Promise<GetUserCommandOutput> {
    try {
      const command = new GetUserCommand({
        AccessToken: accessToken,
      });

      return await this.cognitoClient.send(command);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async createUser(
    data: Auth.SignupRequest,
  ): Promise<AdminCreateUserCommandOutput> {
    try {
      const createUserCommand = new AdminCreateUserCommand({
        UserPoolId: this.configService.get('COGNITO_USER_POOL_ID'),
        Username: data.email,
        UserAttributes: [
          {
            Name: 'email',
            Value: data.email,
          },
          {
            Name: 'name',
            Value: data.name,
          },
          {
            Name: 'email_verified',
            Value: 'true',
          },
        ],
      });

      return await this.cognitoClient.send(createUserCommand);
    } catch (error) {
      throw new Error('Error creating authentication:' + error);
    }
  }
}
