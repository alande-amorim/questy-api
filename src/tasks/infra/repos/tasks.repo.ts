import { Injectable } from '@nestjs/common';
import { PrismaService } from '#infra/prisma/prisma.service';
import { Task } from '#domain/types/task';
import { ITasksRepo } from '../../application/interfaces/tasks.repo.interface';

@Injectable()
export class TasksRepo implements ITasksRepo {
  constructor(private readonly prisma: PrismaService) {}

  private async generateTaskCode(projectId: string): Promise<string> {
    // Get the project to get its code
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { code: true },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    // Get the last task number for this project
    const lastTask = await this.prisma.task.findFirst({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        code: true,
      },
    });

    let serial = 1;
    if (lastTask) {
      // Extract the serial number from the last task code
      const lastSerial = parseInt(lastTask.code.split('-')[1]);
      serial = lastSerial + 1;
    }

    return `${project.code}-${serial.toString().padStart(3, '0')}`;
  }

  async create(data: Task.CreateDTO): Promise<Task.Entity> {
    const code = await this.generateTaskCode(data.projectId);

    return this.prisma.task.create({
      data: {
        ...data,
        code,
        status: data.status || 'BACKLOG',
      },
    });
  }

  async findById(id: string): Promise<Task.Entity | null> {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
        assignee: true,
        reporter: true,
      },
    });
  }

  async findByCode(code: string): Promise<Task.Entity | null> {
    return this.prisma.task.findUnique({
      where: { code },
      include: {
        project: true,
        assignee: true,
        reporter: true,
      },
    });
  }

  async update(id: string, data: Task.UpdateDTO): Promise<Task.Entity> {
    return this.prisma.task.update({
      where: { id },
      data,
      include: {
        project: true,
        assignee: true,
        reporter: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  async findByProjectId(projectId: string): Promise<Task.Entity[]> {
    return this.prisma.task.findMany({
      where: { projectId },
      include: {
        project: true,
        assignee: true,
        reporter: true,
      },
    });
  }

  async findByAssigneeId(assigneeId: string): Promise<Task.Entity[]> {
    return this.prisma.task.findMany({
      where: { assigneeId },
      include: {
        project: true,
        assignee: true,
        reporter: true,
      },
    });
  }

  async findByReporterId(reporterId: string): Promise<Task.Entity[]> {
    return this.prisma.task.findMany({
      where: { reporterId },
      include: {
        project: true,
        assignee: true,
        reporter: true,
      },
    });
  }
}
