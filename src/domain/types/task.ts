import { User, Project, Relations } from './';

export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  DOING = 'DOING',
  DONE = 'DONE',
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export namespace Task {
  export interface Entity {
    id: string;
    projectId: string;
    title: string;
    description: string;
    status: TaskStatus;
    difficulty: Difficulty;
    storyPoints: number;
    assigneeId?: string;
    createdById: string;
    questPartnerId?: string;
    aiGenerated: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface WithRelations extends Entity {
    project: Project.Entity;
    assignee?: User.Entity;
    creator: User.Entity;
    questPartner?: User.Entity;
    xpTransactions: Relations.WithXPTransaction[];
    aiInteractions: Relations.WithAIInteraction[];
  }

  export interface CreateDTO {
    projectId: string;
    title: string;
    description: string;
    status?: TaskStatus;
    difficulty?: Difficulty;
    storyPoints: number;
    assigneeId?: string;
    createdById: string;
    questPartnerId?: string;
    aiGenerated?: boolean;
  }

  export interface UpdateDTO {
    title?: string;
    description?: string;
    status?: TaskStatus;
    difficulty?: Difficulty;
    storyPoints?: number;
    assigneeId?: string;
    questPartnerId?: string;
  }

  export interface ReadDTO extends Entity {
    project?: Project.Entity;
    assignee?: User.Entity;
    creator?: User.Entity;
    questPartner?: User.Entity;
    xpTransactions?: Relations.WithXPTransaction[];
    aiInteractions?: Relations.WithAIInteraction[];
  }
}
