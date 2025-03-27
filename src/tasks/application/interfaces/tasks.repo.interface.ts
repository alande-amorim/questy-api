import { Task } from '#domain/types/task';

export interface ITasksRepo {
  create(data: Task.CreateDTO): Promise<Task.Entity>;
  findById(id: string): Promise<Task.Entity | null>;
  findByCode(code: string): Promise<Task.Entity | null>;
  update(id: string, data: Task.UpdateDTO): Promise<Task.Entity>;
  delete(id: string): Promise<void>;
  findByProjectId(projectId: string): Promise<Task.Entity[]>;
  findByAssigneeId(assigneeId: string): Promise<Task.Entity[]>;
  findByReporterId(reporterId: string): Promise<Task.Entity[]>;
}
