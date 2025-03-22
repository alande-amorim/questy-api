/**
 * @fileoverview This file was generated automatically.
 * @generated
 * @see scripts/generate-domain-types.ts
 */

/* eslint-disable */
import { User, Project, ProjectUser, Task } from '.';

export namespace Relations {
  export interface WithUserProjects {
    projects: Project.Entity[];
  }

  export interface WithUserMemberships {
    memberships: ProjectUser.Entity[];
  }

  export interface WithUserTasks {
    tasks: Task.Entity[];
  }

  export interface WithUserCreatedTasks {
    createdTasks: Task.Entity[];
  }

  export interface WithUserQuestPartnerTasks {
    questPartnerTasks: Task.Entity[];
  }

  export interface WithProjectCreator {
    creator: User.Entity;
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

  export interface WithTaskCreator {
    creator: User.Entity;
  }

  export interface WithTaskQuestPartner {
    questPartner: User.Entity;
  }
}
