import { User } from '#domain/types';
import { Project } from '#domain/types/project';
import { ProjectUsersRepo } from '@projects/infra/repos/project-users.repo';
import { IProjectsRepo } from '../interfaces';

export class ProjectsService {
  constructor(
    private readonly projectsRepo: IProjectsRepo,
    private readonly projectUsersRepo: ProjectUsersRepo,
  ) {}

  async create(
    data: Project.CreateDTO,
    user: User.Entity,
  ): Promise<Project.Entity> {
    const project = await this.projectsRepo.create(data);
    await this.projectUsersRepo.createProjectUser({
      userId: user.id,
      projectId: project.id,
      invitedBy: user.id,
      invitedAt: new Date(),
      acceptedAt: new Date(),
      inviteToken: '',
    });

    return project;
  }

  async findById(id: string): Promise<Project.Entity | null> {
    return this.projectsRepo.findById(id);
  }

  async findMany(userId: User.Entity['id']): Promise<Project.Entity[]> {
    return this.projectsRepo.findByUserId(userId);
  }

  async update(id: string, data: Project.UpdateDTO): Promise<Project.Entity> {
    return this.projectsRepo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.projectsRepo.delete(id);
  }
}
