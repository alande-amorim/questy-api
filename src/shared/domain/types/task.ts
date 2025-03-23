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
    projectId: string;
    title: string;
    description: string;
    status: unknown;
    storyPoints: number;
    assigneeId: string;
    reporterId: string;
    createdAt: Date;
    updatedAt: Date;
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
    status: unknown;
    storyPoints: number;
    assigneeId: string;
    reporterId: string;
  }

  export interface UpdateDTO {
    projectId?: string;
    title?: string;
    description?: string;
    status?: unknown;
    storyPoints?: number;
    assigneeId?: string;
    reporterId?: string;
  }
}
