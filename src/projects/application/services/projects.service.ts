import { Injectable } from '@nestjs/common';
import { Project } from '#domain/types/project';
import { IProjectsRepository } from '../interfaces';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: IProjectsRepository) {}

  async create(data: Project.CreateDTO): Promise<Project.Entity> {
    return this.projectsRepository.create(data);
  }

  async findById(id: string): Promise<Project.Entity | null> {
    return this.projectsRepository.findById(id);
  }

  async findMany(): Promise<Project.Entity[]> {
    return this.projectsRepository.findMany();
  }

  async update(id: string, data: Project.UpdateDTO): Promise<Project.Entity> {
    return this.projectsRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.projectsRepository.delete(id);
  }
}
