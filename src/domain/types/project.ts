/**
 * @fileoverview This file was generated automatically.
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
import { User } from '.';
import { ProjectUser } from '.';
import { Task } from '.';

export namespace Project {
  export interface Entity {
    id: string;
    name: string;
    description: string;
    createdBy: string;
    createdAt: Date;
    creator: any;
    users: any;
    tasks: any;
  }

  export interface WithRelations extends Entity {
    creator: User.Entity;
    users: ProjectUser.Entity[];
    tasks: Task.Entity[];
  }

  export interface CreateDTO {
    name: string;
    description: string;
    createdBy: string;
    createdAt: Date;
    creator: any;
    users: any;
    tasks: any;
  }

  export interface UpdateDTO {
    name?: string;
    description?: string;
    createdBy?: string;
    createdAt?: Date;
    creator?: any;
    users?: any;
    tasks?: any;
  }
}
