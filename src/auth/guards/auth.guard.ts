import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { Auth } from '#domain/types/auth';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtVerifier: any;

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    this.jwtVerifier = CognitoJwtVerifier.create({
      userPoolId: this.configService.get('COGNITO_USER_POOL_ID'),
      tokenUse: 'access',
      clientId: this.configService.get('COGNITO_CLIENT_ID'),
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtVerifier.verify(token);
      const user = await this.authService.getUser(token);
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private mapJwtPayloadToCognitoUser(
    payload: Auth.JwtPayload,
  ): Auth.CognitoUser {
    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      email_verified: payload.email_verified,
      cognito: payload.cognito,
    };
  }
}
