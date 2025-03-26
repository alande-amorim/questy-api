/**
 * @fileoverview Create project DTO
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Project } from '#domain/types/project';

export class CreateProjectDTO implements Project.CreateDTO {
  @ApiProperty({
    description: 'Project code',
    example: 'PRJ',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  code: string;

  @ApiProperty({
    description: 'Project name',
    example: 'My Project',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Project description',
    example: 'A great project',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
