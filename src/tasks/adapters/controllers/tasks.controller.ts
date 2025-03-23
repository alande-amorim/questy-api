import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TasksService } from '../../application/services/tasks.service';
import {
  CreateTaskDTO,
  UpdateTaskDTO,
  TaskResponseDTO,
} from './dtos/tasks.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, type: TaskResponseDTO })
  async create(@Body() createTaskDto: CreateTaskDTO): Promise<TaskResponseDTO> {
    return this.tasksService.create(createTaskDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse({ status: 200, type: TaskResponseDTO })
  async findOne(@Param('id') id: string): Promise<TaskResponseDTO> {
    return this.tasksService.findById(id);
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get all tasks from a project' })
  @ApiResponse({ status: 200, type: [TaskResponseDTO] })
  async findMany(
    @Param('projectId') projectId: string,
  ): Promise<TaskResponseDTO[]> {
    return this.tasksService.findMany(projectId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, type: TaskResponseDTO })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDTO,
  ): Promise<TaskResponseDTO> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id') id: string): Promise<void> {
    await this.tasksService.delete(id);
  }
}
