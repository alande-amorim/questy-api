import { ICognitoService } from '#domain/interfaces/cognito.interface';
import { IUsersRepo } from '#domain/interfaces/users-repo.interface';
import { PrismaService } from '#infra/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectsController } from '@projects/adapters/controllers/projects.controller';
import { InviteService } from '@projects/application/services/invite.service';
import { ProjectsService } from '@projects/application/services/projects.service';
import { ProjectsRepo } from '@projects/infra/repos/projects.repo';
import { ProjectUsersRepo } from './repos/project-users.repo';

@Module({
  imports: [ConfigModule],
  controllers: [ProjectsController],
  providers: [
    {
      provide: 'IProjectsRepo',
      useClass: ProjectsRepo,
    },
    {
      provide: InviteService,
      inject: [PrismaService, 'ICognitoService', 'IUsersRepo'],
      useFactory: (
        cognitoService: ICognitoService,
        usersRepo: IUsersRepo,
        projectUserRepo: ProjectUsersRepo,
      ) => {
        return new InviteService(cognitoService, usersRepo, projectUserRepo);
      },
    },
    {
      provide: ProjectsService,
      inject: ['IProjectsRepo'],
      useFactory: (projectsRepo: ProjectsRepo) => {
        return new ProjectsService(projectsRepo);
      },
    },
  ],
})
export class ProjectsModule {}
