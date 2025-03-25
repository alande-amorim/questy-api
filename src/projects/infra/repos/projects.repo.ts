import { Injectable } from '@nestjs/common';
import { PrismaService } from '#infra/prisma/prisma.service';
import { Project } from '#domain/types/project';
import { IProjectsRepo } from '../../application/interfaces/projects.repo.interface';
import { User } from '#domain/types';

@Injectable()
export class ProjectsRepo implements IProjectsRepo {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Project.CreateDTO): Promise<Project.Entity> {
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async findById(id: string): Promise<Project.Entity | null> {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async findMany(): Promise<Project.Entity[]> {
    return this.prisma.project.findMany();
  }

  async update(id: string, data: Project.UpdateDTO): Promise<Project.Entity> {
    return this.prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }

  async findByUserId(userId: User.Entity['id']): Promise<Project.Entity[]> {
    const userProjects = await this.prisma.projectUser.findMany({
      where: { userId },
      include: { project: true },
    });

    return userProjects.map(({ project }) => project);
  }
}
