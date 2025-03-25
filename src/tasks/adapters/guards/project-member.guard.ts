import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Auth } from '#domain/types/auth';
import { PrismaService } from '#infra/prisma/prisma.service';

@Injectable()
export class ProjectMemberGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const projectId = request.params.projectId;
    const user = request.user as Auth.User;

    if (!projectId || !user) {
      return false;
    }

    const projectUser = await this.prisma.projectUser.findFirst({
      where: {
        projectId,
        userId: user.id,
        NOT: {
          acceptedAt: null,
        },
      },
    });

    return !!projectUser;
  }
}
