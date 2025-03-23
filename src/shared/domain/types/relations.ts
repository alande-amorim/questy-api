/**
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
import { User, Project, ProjectUser, Task } from '.';

export namespace Relations {
  export interface WithUserMemberships {
    memberships: ProjectUser.Entity[];
  }

  export interface WithUserAssignedTasks {
    assignedTasks: Task.Entity[];
  }

  export interface WithUserReportedTasks {
    reportedTasks: Task.Entity[];
  }

  export interface WithProjectUsers {
    users: ProjectUser.Entity[];
  }

  export interface WithProjectTasks {
    tasks: Task.Entity[];
  }

  export interface WithProjectUserProject {
    project: Project.Entity;
  }

  export interface WithProjectUserUser {
    user: User.Entity;
  }

  export interface WithTaskProject {
    project: Project.Entity;
  }

  export interface WithTaskAssignee {
    assignee: User.Entity;
  }

  export interface WithTaskReporter {
    reporter: User.Entity;
  }
}
