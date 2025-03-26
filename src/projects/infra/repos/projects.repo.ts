import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '#infra/prisma/prisma.service';
import { Project } from '#domain/types/project';
import {
  IProjectsRepo,
  ProjectWithCounts,
} from '../../application/interfaces/projects.repo.interface';
import { User } from '#domain/types';

@Injectable()
export class ProjectsRepo implements IProjectsRepo {
  constructor(private readonly prisma: PrismaService) {}

  private generateProjectCode(name: string): string {
    // Remove special characters and spaces, convert to uppercase
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    // Take first 3 characters, if name is too short, pad with 'X'
    return sanitizedName.slice(0, 3).padEnd(3, 'X');
  }

  private validateProjectCode(code: string): void {
    if (!code || code.length < 3 || code.length > 4) {
      throw new BadRequestException(
        'Project code must be between 3 and 4 characters',
      );
    }
    if (!/^[A-Z0-9]+$/.test(code)) {
      throw new BadRequestException(
        'Project code must contain only uppercase letters and numbers',
      );
    }
  }

  async create(data: Project.CreateDTO): Promise<Project.Entity> {
    const code = data.code || this.generateProjectCode(data.name);
    this.validateProjectCode(code);

    // Check if code already exists
    const existingProject = await this.prisma.project.findFirst({
      where: { code },
    });

    if (existingProject) {
      throw new BadRequestException('Project code already exists');
    }

    return this.prisma.project.create({
      data: {
        name: data.name,
        code,
        description: data.description,
      },
    });
  }

  async findById(id: string): Promise<Project.Entity | null> {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async findByCode(code: string): Promise<Project.Entity | null> {
    return this.prisma.project.findUnique({
      where: { code },
    });
  }

  async update(id: string, data: Project.UpdateDTO): Promise<Project.Entity> {
    if (data.code) {
      this.validateProjectCode(data.code);

      // Check if code already exists for other projects
      const existingProject = await this.prisma.project.findFirst({
        where: {
          code: data.code,
          NOT: { id },
        },
      });

      if (existingProject) {
        throw new BadRequestException('Project code already exists');
      }
    }

    return this.prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        code: data.code,
        description: data.description,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }

  async findByUserId(userId: User.Entity['id']): Promise<ProjectWithCounts[]> {
    const userProjects = await this.prisma.projectUser.findMany({
      where: { userId },
    });
    const projectIds = userProjects.map(({ projectId }) => projectId);

    const projects = await this.prisma.project.findMany({
      where: { id: { in: projectIds } },
      include: {
        _count: { select: { tasks: true, users: true } },
      },
    });

    return projects;
  }
}
