import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  Min,
  Max,
  IsUUID,
  Length,
  IsOptional,
} from 'class-validator';
import { Task } from '#domain/types';

interface ICreateTaskDTO
  extends Omit<Task.CreateDTO, 'reporterId' | 'projectId'> {
  reporterId?: string;
}

export class CreateTaskDTO implements ICreateTaskDTO {
  @ApiProperty({
    description: 'Task title',
    example: 'Implement feature X',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Detailed description of the task',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Task status',
    example: Task.TaskStatus.BACKLOG,
    enum: Task.TaskStatus,
  })
  @IsEnum(Task.TaskStatus)
  @IsNotEmpty()
  status: Task.TaskStatus;

  @ApiProperty({
    description: 'Story points',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Story points must be a positive number' })
  @Max(100, { message: 'Story points cannot exceed 100' })
  storyPoints: number;

  @ApiProperty({
    description: 'Assignee ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  assigneeId?: string;

  @ApiProperty({
    description: 'Reporter ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  reporterId?: string;
}
