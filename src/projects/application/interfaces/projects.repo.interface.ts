import { User } from '#domain/types';
import { Project } from '#domain/types/project';

export type ProjectWithCounts = Project.Entity & {
  _count: {
    tasks: number;
    users: number;
  };
};

export interface IProjectsRepo {
  create(data: Project.CreateDTO): Promise<Project.Entity>;
  findByUserId(userId: User.Entity['id']): Promise<ProjectWithCounts[]>;
  findById(id: string): Promise<Project.Entity | null>;
  update(id: string, data: Project.UpdateDTO): Promise<Project.Entity>;
  delete(id: string): Promise<void>;
}
