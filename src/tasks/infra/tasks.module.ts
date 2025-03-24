import { Module } from '@nestjs/common';
import { TasksController } from '../adapters/controllers/tasks.controller';
import { TasksService } from '../application/services/tasks.service';
import { TasksRepo } from './repo/tasks.repo';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TasksController],
  providers: [
    {
      provide: 'ITasksRepo',
      useClass: TasksRepo,
    },
    {
      provide: TasksService,
      inject: ['ITasksRepo'],
      useFactory: (repo: TasksRepo) => {
        return new TasksService(repo);
      },
    },
  ],
})
export class TasksModule {}
