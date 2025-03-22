/**
 * @fileoverview Projects repository implementation
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '#infra/prisma/prisma.service';
import { Project } from '#domain/types/project';
import { IProjectsRepository } from '../../application/interfaces/projects.repo.interface';

@Injectable()
export class ProjectsRepository implements IProjectsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Project.CreateDTO): Promise<Project.Entity> {
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        creator: {
          connect: {
            id: data.createdBy,
          },
        },
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
        creator: {
          connect: {
            id: data.createdBy,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }
}
