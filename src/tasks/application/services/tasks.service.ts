import { Task } from '#domain/types';
import { ITasksRepo } from '../repo/tasks.repo.interface';

export class TasksService {
  constructor(private readonly tasksRepository: ITasksRepo) {}

  async create(data: Task.CreateDTO): Promise<Task.Entity> {
    return this.tasksRepository.create(data);
  }

  async findById(id: string): Promise<Task.Entity | null> {
    return this.tasksRepository.findById(id);
  }

  async findMany(projectId: string): Promise<Task.Entity[]> {
    return this.tasksRepository.findMany(projectId);
  }

  async update(id: string, data: Task.UpdateDTO): Promise<Task.Entity> {
    return this.tasksRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
