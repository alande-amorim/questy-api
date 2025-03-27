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
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
  title?: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Updated task description',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(10, 1000, {
    message: 'Description must be between 10 and 1000 characters',
  })
  description?: string;

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
