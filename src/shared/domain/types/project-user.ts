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
    inviteToken?: string;
    invitedBy?: string;
    invitedAt?: Date;
    acceptedAt?: Date;
    createdAt: Date;
  }

  export interface WithRelations extends Entity {
    project?: Project.Entity;
    user?: User.Entity;
  }

  export interface CreateDTO {
    projectId: string;
    userId: string;
    inviteToken?: string;
    invitedBy?: string;
    invitedAt?: Date;
    acceptedAt?: Date;
  }

  export interface UpdateDTO {
    projectId?: string;
    userId?: string;
    inviteToken?: string;
    invitedBy?: string;
    invitedAt?: Date;
    acceptedAt?: Date;
  }

  
}
