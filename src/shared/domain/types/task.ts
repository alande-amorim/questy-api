/**
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
import { Project } from '.';
import { User } from '.';

export namespace Task {
  export interface Entity {
    id: string;
    code: string;
    projectId: string;
    title: string;
    description: string;
    acceptanceCriteria?: string;
    status: TaskStatus;
    storyPoints: number;
    assigneeId?: string;
    reporterId: string;
    updatedAt: Date;
    createdAt: Date;
  }

  export interface WithRelations extends Entity {
    project?: Project.Entity;
    assignee?: User.Entity;
    reporter?: User.Entity;
  }

  export interface CreateDTO {
    projectId: string;
    title: string;
    description: string;
    acceptanceCriteria?: string;
    status?: TaskStatus;
    storyPoints: number;
    assigneeId?: string;
    reporterId: string;
  }

  export interface UpdateDTO {
    title?: string;
    description?: string;
    acceptanceCriteria?: string;
    status?: TaskStatus;
    storyPoints?: number;
    assigneeId?: string;
  }

  export const TaskStatus = {
    BACKLOG: 'BACKLOG',
    DOING: 'DOING',
    DONE: 'DONE',
  } as const;
  export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
}
