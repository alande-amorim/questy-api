import { User } from '#domain/types';
import { Project } from '#domain/types/project';

export interface IProjectsRepo {
  create(data: Project.CreateDTO): Promise<Project.Entity>;
  findByUserId(userId: User.Entity['id']): Promise<Project.Entity[]>;
  findById(id: string): Promise<Project.Entity | null>;
  findMany(): Promise<Project.Entity[]>;
  update(id: string, data: Project.UpdateDTO): Promise<Project.Entity>;
  delete(id: string): Promise<void>;
}
