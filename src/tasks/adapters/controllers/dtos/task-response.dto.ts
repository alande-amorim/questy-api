import { ApiProperty } from '@nestjs/swagger';
import { Task } from '#domain/types';

export class TaskResponseDTO implements Task.Entity {
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
    example: 'TODO',
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
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
}
