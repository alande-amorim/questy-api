import { Injectable, UnauthorizedException } from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { Auth } from '#domain/types/auth';
import { User } from '#domain/types';
import { ICognitoService } from '#domain/interfaces/cognito.interface';
import { IUsersRepo } from '#domain/interfaces/users-repo.interface';

@Injectable()
export class AuthService {
  constructor(
    private cognitoService: ICognitoService,
    private userRepo: IUsersRepo,
  ) {}

  /**
   * @TODO: upsert user into database?
   */
  async signUp(signUpRequest: Auth.SignupRequest): Promise<void> {
    await this.cognitoService.signUp(signUpRequest);
  }

  async confirmSignUp(
    confirmSignUpRequest: Auth.ConfirmSignupRequest,
  ): Promise<void> {
    await this.cognitoService.confirmSignUp(confirmSignUpRequest);
  }

  private async syncUser(user: Auth.ProviderUser): Promise<User.Entity> {
    return await this.userRepo.upsertFromCognito(user);
  }

  async signIn(signInRequest: Auth.SignInRequest): Promise<Auth.User> {
    try {
      const response = await this.cognitoService.signIn(signInRequest);

      const decodedAccessToken = decode(
        response.AuthenticationResult.AccessToken,
      );
      const decodedId = decode(response.AuthenticationResult.IdToken);
      const cognitoUser = {
        sub: decodedId.sub,
        email: decodedId.email,
        name: decodedId.name,
      };

      const dbUser = await this.syncUser(cognitoUser);

      return {
        ...dbUser,
        token: {
          accessToken: response.AuthenticationResult.AccessToken,
          refreshToken: response.AuthenticationResult.RefreshToken,
          expiresAt: decodedAccessToken.exp,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getUser(accessToken: string): Promise<Auth.User> {
    try {
      const decodedAccessToken = decode(accessToken);
      let user = await this.userRepo.findBySub(decodedAccessToken.sub);

      if (!user) {
        const response = await this.cognitoService.getUser(accessToken);
        const cognitoUser = response.UserAttributes.reduce((acc, curr) => {
          acc[curr.Name] = curr.Value;
          return acc;
        }, {});
        user = await this.syncUser({
          sub: cognitoUser['sub'],
          email: cognitoUser['email'],
          name: cognitoUser['name'],
        });
      }

      return {
        ...user,
        token: {
          accessToken: accessToken,
          refreshToken: 'N/A',
          expiresAt: decodedAccessToken.exp,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
