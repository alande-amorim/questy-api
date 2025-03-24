/**
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
import { ProjectUser } from '.';
import { Task } from '.';

export namespace User {
  export interface Entity {
    id: string;
    cognitoSub: string;
    name: string;
    email: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface WithRelations extends Entity {
    memberships?: ProjectUser.Entity[];
    assignedTasks?: Task.Entity[];
    reportedTasks?: Task.Entity[];
  }

  export interface CreateDTO {
    cognitoSub: string;
    name: string;
    email: string;
    avatarUrl?: string;
  }

  export interface UpdateDTO {
    cognitoSub?: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
  }

  
}
