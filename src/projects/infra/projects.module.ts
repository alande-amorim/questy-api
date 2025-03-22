import { Module } from '@nestjs/common';
import { ProjectsController } from '../adapters/controllers/projects.controller';

@Module({
  controllers: [ProjectsController],
  // providers: [ProjectsService, ProjectsRepository],
  // exports: [ProjectsService],
})
export class ProjectsModule {}
