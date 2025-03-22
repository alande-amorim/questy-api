import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from 'src/projects/infra/projects.module';

@Module({
  imports: [PrismaModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
