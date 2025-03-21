import { Project } from '#domain/types/project';

export interface IProjectsRepository {
  create(data: Project.CreateDTO): Promise<Project.Entity>;
  findById(id: string): Promise<Project.Entity | null>;
  findMany(): Promise<Project.Entity[]>;
  update(id: string, data: Project.UpdateDTO): Promise<Project.Entity>;
  delete(id: string): Promise<void>;
}
