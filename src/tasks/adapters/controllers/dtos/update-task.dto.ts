import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  Min,
  Max,
  IsUUID,
  Length,
} from 'class-validator';
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
    description: 'Task acceptance criteria',
    example: 'Updated task acceptance criteria',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  acceptanceCriteria?: string;

  @ApiProperty({
    description: 'Task status',
    example: 'BACKLOG',
    enum: Task.TaskStatus,
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
  @Min(0, { message: 'Story points must be a positive number' })
  @Max(100, { message: 'Story points cannot exceed 100' })
  storyPoints?: number;

  @ApiProperty({
    description: 'Assignee ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  assigneeId?: string;

  @ApiProperty({
    description: 'Reporter ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  reporterId?: string;
}
