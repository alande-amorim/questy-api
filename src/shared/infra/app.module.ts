import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from '@projects/infra/projects.module';
import { TasksModule } from 'src/tasks/infra/tasks.module';

@Module({
  imports: [PrismaModule, ProjectsModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
