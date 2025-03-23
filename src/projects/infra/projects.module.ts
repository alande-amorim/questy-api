import { Module } from '@nestjs/common';
import { ProjectsController } from '@projects/adapters/controllers/projects.controller';
import { ProjectsService } from '@projects/application/services/projects.service';
import { ProjectsRepo } from '@projects/infra/repos/projects.repo';

@Module({
  controllers: [ProjectsController],
  providers: [
    {
      provide: ProjectsService,
      useClass: ProjectsService,
    },
    {
      provide: 'IProjectsRepo',
      useClass: ProjectsRepo,
    },
  ],
})
export class ProjectsModule {}
