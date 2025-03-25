import { Injectable } from '@nestjs/common';
import { PrismaService } from '#infra/prisma/prisma.service';
import { Auth } from '#domain/types/auth';
import { User } from '#domain/types';

@Injectable()
export class UserRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findBySub(sub: string): Promise<User.Entity | null> {
    return this.prisma.user.findUnique({
      where: { cognitoSub: sub },
    });
  }

  async upsertFromCognito(user: Auth.ProviderUser): Promise<User.Entity> {
    return this.prisma.user.upsert({
      where: { cognitoSub: user.sub },
      update: {
        email: user.email,
        name: user.name,
      },
      create: {
        cognitoSub: user.sub,
        email: user.email,
        name: user.name,
      },
    });
  }
}
