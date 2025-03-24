import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectsController } from '@projects/adapters/controllers/projects.controller';
import { ProjectsService } from '@projects/application/services/projects.service';
import { ProjectsRepo } from '@projects/infra/repos/projects.repo';

@Module({
  imports: [ConfigModule],
  controllers: [ProjectsController],
  providers: [
    {
      provide: 'IProjectsRepo',
      useClass: ProjectsRepo,
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
