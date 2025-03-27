/**
 * @fileoverview Project response DTO
 */

import { ApiProperty } from '@nestjs/swagger';
import { Project } from '#domain/types/project';
import { Task, User } from '#domain/types';
import { TaskResponseDTO as TaskDTO, UserResponseDTO as UserDTO } from '.';

export class ProjectResponseDTO implements Project.WithRelations {
  @ApiProperty({
    description: 'Project ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Project code',
    example: 'PRJ',
  })
  code: string;

  @ApiProperty({
    description: 'Project name',
    example: 'My Project',
  })
  name: string;

  @ApiProperty({
    description: 'Project description',
    example: 'A project description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Project creation date',
    example: '2024-03-20T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Project last update date',
    example: '2024-03-20T10:00:00Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Project tasks',
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Task 1',
        description: 'Task description',
        status: 'BACKLOG',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    type: [TaskDTO],
  })
  tasks?: Task.Entity[];

  @ApiProperty({
    description: 'Project users',
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John Doe',
        cognitoSub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'john.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    type: [UserDTO],
  })
  users?: User.Entity[];

  @ApiProperty({
    description: 'Project counts',
    example: {
      tasks: 10,
      users: 2,
    },
  })
  _count?: {
    tasks: number;
    users: number;
  };
}
