import { ApiProperty } from '@nestjs/swagger';
import { Task, User } from '#domain/types';
import { UserDTO } from './user.dto';

export class TaskResponseDTO implements Task.WithRelations {
  @ApiProperty({
    description: 'Task ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Implement feature X',
  })
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Detailed description of the task',
  })
  description: string;

  @ApiProperty({
    description: 'Task status',
    example: 'BACKLOG',
    enum: Task.TaskStatus,
  })
  status: Task.TaskStatus;

  @ApiProperty({
    description: 'Story points',
    example: 5,
  })
  storyPoints: number;

  @ApiProperty({
    description: 'Project ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  projectId: string;

  @ApiProperty({
    description: 'Assignee ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  assigneeId?: string;

  @ApiProperty({
    description: 'Reporter ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  reporterId: string;

  @ApiProperty({
    description: 'Task creation date',
    example: '2024-03-20T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Task last update date',
    example: '2024-03-20T10:00:00Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Assignee',
    type: UserDTO,
    required: false,
    nullable: true,
  })
  assignee?: User.Entity;

  @ApiProperty({
    description: 'Reporter',
    type: UserDTO,
    required: true,
    nullable: false,
  })
  reporter?: User.Entity;
}
