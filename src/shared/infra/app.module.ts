import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from '@projects/infra/projects.module';
import { TasksModule } from '@tasks/infra/tasks.module';
import { AuthModule } from '@auth/auth.module';
import { CognitoModule } from './cognito/cognito.module';
import { ReposModule } from './repos/repos.module';

@Module({
  imports: [
    PrismaModule,
    CognitoModule,
    ReposModule,
    AuthModule,
    ProjectsModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
