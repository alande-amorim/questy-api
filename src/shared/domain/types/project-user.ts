/**
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
import { Project } from '.';
import { User } from '.';

export namespace ProjectUser {
  export interface Entity {
    projectId: string;
    userId: string;
    joinedAt: Date;
  }

  export interface WithRelations extends Entity {
    project: Project.Entity;
    user: User.Entity;
  }

  export interface CreateDTO {
    projectId: string;
    userId: string;
    joinedAt: Date;
    project: unknown;
    user: unknown;
  }

  export interface UpdateDTO {
    projectId?: string;
    userId?: string;
    joinedAt?: Date;
    project?: unknown;
    user?: unknown;
  }
}
