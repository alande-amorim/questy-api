import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from '@projects/infra/projects.module';
import { TasksModule } from '@tasks/infra/tasks.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [PrismaModule, ProjectsModule, TasksModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
