import { Auth } from '#domain/types/auth';

export class AuthResponseDTO implements Auth.User {
  id: string;
  cognitoSub: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;

  token: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
}
