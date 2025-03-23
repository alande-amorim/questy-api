import { Task } from '#domain/types';

export interface ITasksRepo {
  create(data: Task.CreateDTO): Promise<Task.Entity>;
  findById(id: string): Promise<Task.Entity | null>;
  findMany(projectId: string): Promise<Task.Entity[]>;
  update(id: string, data: Task.UpdateDTO): Promise<Task.Entity>;
  delete(id: string): Promise<void>;
}
