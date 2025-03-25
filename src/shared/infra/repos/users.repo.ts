import { Injectable } from '@nestjs/common';
import { PrismaService } from '#infra/prisma/prisma.service';
import { Auth } from '#domain/types/auth';
import { User } from '#domain/types';
import { IUsersRepo } from '#domain/interfaces/users-repo.interface';

@Injectable()
export class UsersRepo implements IUsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: User.Entity['id']): Promise<User.Entity | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findBySub(sub: string): Promise<User.Entity | null> {
    return this.prisma.user.findUnique({
      where: { cognitoSub: sub },
    });
  }

  async findOrCreate(input: User.CreateDTO): Promise<User.Entity> {
    const existing = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        cognitoSub: input.cognitoSub,
      },
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
