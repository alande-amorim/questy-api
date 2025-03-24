/**
 * @fileoverview Project response DTO
 */

import { ApiProperty } from '@nestjs/swagger';
import { Project } from '#domain/types/project';
import { Task } from '#domain/types';

export class ProjectResponseDTO implements Project.Entity {
  @ApiProperty({
    description: 'Project ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

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
        status: 'TODO',
      },
    ],
  })
  tasks?: Task.Entity[];
}
