import { Project, Task, User } from '.';

export namespace Relations {
  export interface WithUser {
    user: User.Entity;
  }

  export interface WithProject {
    project: Project.Entity;
  }

  export interface WithTask {
    task: Task.Entity;
  }

  export interface WithProjectUser {
    projectUser: {
      projectId: string;
      userId: string;
      joinedAt: Date;
    };
  }

  export interface WithXPTransaction {
    xpTransaction: {
      id: string;
      userId: string;
      taskId?: string;
      type: 'REFINE' | 'COMPLETE_TASK' | 'PAIR_PROGRAMMING';
      amount: number;
      createdAt: Date;
    };
  }

  export interface WithAIInteraction {
    aiInteraction: {
      id: string;
      userId: string;
      taskId: string;
      type: 'DESCRIPTION' | 'ACCEPTANCE_CRITERIA';
      content: string;
      createdAt: Date;
    };
  }

  export interface WithNotification {
    notification: {
      id: string;
      userId: string;
      title: string;
      message: string;
      read: boolean;
      createdAt: Date;
    };
  }
}
