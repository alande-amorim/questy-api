import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { Task } from '#domain/types';

export class UpdateTaskDTO implements Task.UpdateDTO {
  @ApiProperty({
    description: 'Task title',
    example: 'Updated task title',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Updated task description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Task status',
    example: 'IN_PROGRESS',
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    required: false,
  })
  @IsEnum(Task.TaskStatus)
  @IsOptional()
  status?: Task.TaskStatus;

  @ApiProperty({
    description: 'Story points',
    example: 5,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  storyPoints?: number;

  @ApiProperty({
    description: 'Assignee ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsString()
  @IsOptional()
  assigneeId?: string;

  @ApiProperty({
    description: 'Reporter ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsString()
  @IsOptional()
  reporterId?: string;
}
