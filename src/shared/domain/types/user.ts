/**
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
import { Project } from '.';
import { ProjectUser } from '.';
import { Task } from '.';

export namespace User {
  export interface Entity {
    id: string;
    cognitoSub: string;
    name: string;
    email: string;
    avatarUrl: string;
    xp: number;
    level: number;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface WithRelations extends Entity {
    projects?: Project.Entity[];
    memberships?: ProjectUser.Entity[];
    tasks?: Task.Entity[];
    createdTasks?: Task.Entity[];
    questPartnerTasks?: Task.Entity[];
  }

  export interface CreateDTO {
    cognitoSub: string;
    name: string;
    email: string;
    avatarUrl: string;
    xp: number;
    level: number;
    createdAt: Date;
    updatedAt: Date;
    projects: unknown;
    memberships: unknown;
    tasks: unknown;
    createdTasks: unknown;
    questPartnerTasks: unknown;
  }

  export interface UpdateDTO {
    cognitoSub?: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
    xp?: number;
    level?: number;
    createdAt?: Date;
    updatedAt?: Date;
    projects?: unknown;
    memberships?: unknown;
    tasks?: unknown;
    createdTasks?: unknown;
    questPartnerTasks?: unknown;
  }
}
