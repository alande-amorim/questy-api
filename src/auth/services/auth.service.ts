import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  GetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Auth } from '#domain/types/auth';

@Injectable()
export class AuthService {
  private cognitoClient: CognitoIdentityProviderClient;
  private clientId: string;
  private userPoolId: string;

  constructor(private configService: ConfigService) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
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

  async signIn(signInRequest: Auth.SignInRequest): Promise<Auth.AuthResponse> {
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

      return {
        accessToken: response.AuthenticationResult.AccessToken,
        refreshToken: response.AuthenticationResult.RefreshToken,
        idToken: response.AuthenticationResult.IdToken,
        expiresIn: response.AuthenticationResult.ExpiresIn,
        tokenType: response.AuthenticationResult.TokenType,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getUser(accessToken: string): Promise<Auth.CognitoUser> {
    try {
      const command = new GetUserCommand({
        AccessToken: accessToken,
      });

      const response = await this.cognitoClient.send(command);

      const userAttributes = response.UserAttributes.reduce(
        (acc, attr) => {
          acc[attr.Name] = attr.Value;
          return acc;
        },
        {} as Record<string, string>,
      );

      return {
        sub: response.Username,
        email: userAttributes.email,
        name: userAttributes.name,
        email_verified: userAttributes.email_verified === 'true',
        cognito: {
          username: response.Username,
          groups: [], // You might want to fetch groups separately
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Failed to get user information');
    }
  }
}
