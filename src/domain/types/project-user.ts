/**
 * @fileoverview This file was generated automatically.
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
    project: any;
    user: any;
  }

  export interface WithRelations extends Entity {
    project: Project.Entity;
    user: User.Entity;
  }

  export interface CreateDTO {
    projectId: string;
    userId: string;
    joinedAt: Date;
    project: any;
    user: any;
  }

  export interface UpdateDTO {
    projectId?: string;
    userId?: string;
    joinedAt?: Date;
    project?: any;
    user?: any;
  }
}
