import { User, Task, Relations } from './';

export namespace Project {
  export interface Entity {
    id: string;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
  }

  export interface WithRelations extends Entity {
    creator: User.Entity;
    users: Relations.WithProjectUser[];
    tasks: Task.Entity[];
  }

  export interface CreateDTO {
    name: string;
    description?: string;
    createdBy: string;
  }

  export interface UpdateDTO {
    name?: string;
    description?: string;
  }

  export interface ReadDTO extends Entity {
    creator?: User.Entity;
    users?: Relations.WithProjectUser[];
    tasks?: Task.Entity[];
  }
}
