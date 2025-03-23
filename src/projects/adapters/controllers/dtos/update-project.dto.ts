/**
 * @fileoverview Update project DTO
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { Project } from '#domain/types/project';

export class UpdateProjectDTO implements Project.UpdateDTO {
  @ApiProperty({
    description: 'Project name',
    example: 'My Updated Project',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Project description',
    example: 'An updated project description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
