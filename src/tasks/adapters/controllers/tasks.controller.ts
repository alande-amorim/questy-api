import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TasksService } from '../../application/services/tasks.service';
import { CreateTaskDTO, UpdateTaskDTO, TaskResponseDTO } from './dtos';
import { AuthGuard } from '@auth/guards/auth.guard';
import { CurrentUser } from '@auth/decorators/current-user.decorator';
import { Auth } from '#domain/types/auth';
import { ProjectMemberGuard } from '../guards/project-member.guard';

@ApiTags('tasks')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, ProjectMemberGuard)
@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task in a project' })
  @ApiResponse({ status: 201, type: TaskResponseDTO })
  async create(
    @Param('projectId') projectId: string,
    @Body() createTaskDto: CreateTaskDTO,
    @CurrentUser() user: Auth.User,
  ): Promise<TaskResponseDTO> {
    return this.tasksService.create({
      projectId,
      reporterId: user.id,
      ...createTaskDto,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id from a project' })
  @ApiResponse({ status: 200, type: TaskResponseDTO })
  async findOne(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
  ): Promise<TaskResponseDTO> {
    return this.tasksService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks from a project' })
  @ApiResponse({ status: 200, type: [TaskResponseDTO] })
  async findMany(
    @Param('projectId') projectId: string,
  ): Promise<TaskResponseDTO[]> {
    return this.tasksService.findMany(projectId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task in a project' })
  @ApiResponse({ status: 200, type: TaskResponseDTO })
  async update(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDTO,
  ): Promise<TaskResponseDTO> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task from a project' })
  @ApiResponse({ status: 204 })
  async remove(): Promise<void> {
    throw new Error('Not implemented');
  }
}
