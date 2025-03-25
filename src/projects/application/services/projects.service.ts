import { User } from '#domain/types';
import { Project } from '#domain/types/project';
import { IProjectsRepo } from '../interfaces';

export class ProjectsService {
  constructor(private readonly projectsRepository: IProjectsRepo) {}

  async create(data: Project.CreateDTO): Promise<Project.Entity> {
    return this.projectsRepository.create(data);
  }

  async findById(id: string): Promise<Project.Entity | null> {
    return this.projectsRepository.findById(id);
  }

  async findMany(userId: User.Entity['id']): Promise<Project.Entity[]> {
    return this.projectsRepository.findByUserId(userId);
  }

  async update(id: string, data: Project.UpdateDTO): Promise<Project.Entity> {
    return this.projectsRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.projectsRepository.delete(id);
  }
}
