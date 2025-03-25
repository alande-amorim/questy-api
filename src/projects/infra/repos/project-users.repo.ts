import { Injectable } from '@nestjs/common';
import { PrismaService } from '#infra/prisma/prisma.service';

@Injectable()
export class ProjectUsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findProjectUser(projectId: string, userId: string) {
    return this.prisma.projectUser.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
    });
  }

  async createProjectUser(data: {
    projectId: string;
    userId: string;
    invitedBy: string;
    invitedAt: Date;
    inviteToken: string;
    acceptedAt?: Date;
  }) {
    return this.prisma.projectUser.create({
      data,
    });
  }

  async findInviteByToken(token: string) {
    return this.prisma.projectUser.findFirst({
      where: {
        inviteToken: token,
        invitedAt: {
          not: null,
        },
        acceptedAt: null,
      },
    });
  }

  async updateProjectUser(
    projectId: string,
    userId: string,
    data: {
      userId: string;
      acceptedAt: Date;
      inviteToken: null;
    },
  ) {
    return this.prisma.projectUser.update({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
      data,
    });
  }
}
