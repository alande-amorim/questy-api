import { Module } from '@nestjs/common';
import { TasksController } from '../adapters/controllers/tasks.controller';
import { TasksService } from '../application/services/tasks.service';
import { TasksRepo } from './repo/tasks.repo';

@Module({
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
