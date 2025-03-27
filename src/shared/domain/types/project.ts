/**
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
import { Task, User } from '.';

export namespace Project {
  export interface Entity {
    id: string;
    name: string;
    code: string;
    description?: string;
    updatedAt: Date;
    createdAt: Date;
  }

  export interface WithRelations extends Entity {
    users?: User.Entity[];
    tasks?: Task.Entity[];
  }

  export interface CreateDTO {
    name: string;
    code: string;
    description?: string;
  }

  export interface UpdateDTO {
    name?: string;
    code?: string;
    description?: string;
  }
}
