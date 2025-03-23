import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { Task } from '#domain/types';

export class CreateTaskDTO implements Task.CreateDTO {
  @ApiProperty({
    description: 'Task title',
    example: 'Implement feature X',
  })
  @IsString()
  @IsNotEmpty()
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
    description: 'Project ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: 'Story points',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  storyPoints: number;

  @ApiProperty({
    description: 'Assignee ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  assigneeId: string;

  @ApiProperty({
    description: 'Reporter ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  reporterId: string;
}
