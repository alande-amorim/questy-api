import { Injectable } from '@nestjs/common';
import { Task } from '#domain/types';
import { ITasksRepo } from '../../application/repo/tasks.repo.interface';
import { PrismaService } from '#infra/prisma/prisma.service';

function withConnect(connectionName: string, id: string) {
  let relation = null;

  if (id) {
    relation = { [connectionName]: { connect: { id } } };
  }

  return relation;
}

@Injectable()
export class TasksRepo implements ITasksRepo {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    projectId,
    assigneeId,
    reporterId,
    ...data
  }: Task.CreateDTO): Promise<Task.Entity> {
    return this.prisma.task.create({
      data: {
        ...data,
        ...withConnect('assignee', assigneeId),
        ...withConnect('reporter', reporterId),
        ...withConnect('project', projectId),
      },
    });
  }

  async findById(id: string): Promise<Task.Entity | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async findMany(projectId: string): Promise<Task.Entity[]> {
    const tasks = await this.prisma.task.findMany({
      where: { projectId },
      include: {
        assignee: true,
        reporter: true,
      },
    });

    return tasks;
  }

  async update(id: string, data: Task.UpdateDTO): Promise<Task.Entity> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
