/**
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
import { ProjectUser } from '.';
import { Task } from '.';

export namespace Project {
  export interface Entity {
    id: string;
    name: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
  }

  export interface WithRelations extends Entity {
    users?: ProjectUser.Entity[];
    tasks?: Task.Entity[];
  }

  export interface CreateDTO {
    name: string;
    description: string;
  }

  export interface UpdateDTO {
    name?: string;
    description?: string;
  }
}
