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
    difficulty: unknown;
    storyPoints: number;
    assigneeId: string;
    createdById: string;
    questPartnerId: string;
    aiGenerated: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface WithRelations extends Entity {
    project: Project.Entity;
    assignee: User.Entity;
    creator: User.Entity;
    questPartner: User.Entity;
  }

  export interface CreateDTO {
    projectId: string;
    title: string;
    description: string;
    status: unknown;
    difficulty: unknown;
    storyPoints: number;
    assigneeId: string;
    createdById: string;
    questPartnerId: string;
    aiGenerated: boolean;
    createdAt: Date;
    updatedAt: Date;
    project: unknown;
    assignee: unknown;
    creator: unknown;
    questPartner: unknown;
  }

  export interface UpdateDTO {
    projectId?: string;
    title?: string;
    description?: string;
    status?: unknown;
    difficulty?: unknown;
    storyPoints?: number;
    assigneeId?: string;
    createdById?: string;
    questPartnerId?: string;
    aiGenerated?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    project?: unknown;
    assignee?: unknown;
    creator?: unknown;
    questPartner?: unknown;
  }
}
