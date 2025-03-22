import { Project, Task, Relations } from './';

export namespace User {
  export interface Entity {
    id: string;
    cognitoSub: string;
    name: string;
    email: string;
    avatarUrl?: string;
    xp: number;
    level: number;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface WithRelations extends Entity {
    projects: Project.Entity[];
    memberships: Relations.WithProjectUser[];
    assignedTasks: Task.Entity[];
    createdTasks: Task.Entity[];
    questPartnerTasks: Task.Entity[];
    xpTransactions: Relations.WithXPTransaction[];
    aiInteractions: Relations.WithAIInteraction[];
    notifications: Relations.WithNotification[];
  }

  export interface CreateDTO {
    cognitoSub: string;
    name: string;
    email: string;
    avatarUrl?: string;
  }

  export interface UpdateDTO {
    name?: string;
    email?: string;
    avatarUrl?: string;
  }

  export interface ReadDTO extends Entity {
    projects?: Project.Entity[];
    memberships?: Relations.WithProjectUser[];
    assignedTasks?: Task.Entity[];
    createdTasks?: Task.Entity[];
    questPartnerTasks?: Task.Entity[];
    xpTransactions?: Relations.WithXPTransaction[];
    aiInteractions?: Relations.WithAIInteraction[];
    notifications?: Relations.WithNotification[];
  }
}
