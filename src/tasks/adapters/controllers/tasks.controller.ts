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
import {
  CreateTaskDTO,
  UpdateTaskDTO,
  TaskResponseDTO,
} from './dtos/tasks.dto';
import { AuthGuard } from '@auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Auth } from '#domain/types/auth';

@ApiTags('tasks')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, type: TaskResponseDTO })
  async create(
    @Body() createTaskDto: CreateTaskDTO,
    @CurrentUser() user: Auth.CognitoUser,
  ): Promise<TaskResponseDTO> {
    console.log(user);
    return this.tasksService.create(createTaskDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse({ status: 200, type: TaskResponseDTO })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: Auth.CognitoUser,
  ): Promise<TaskResponseDTO> {
    console.log(user);
    return this.tasksService.findById(id);
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get all tasks from a project' })
  @ApiResponse({ status: 200, type: [TaskResponseDTO] })
  async findMany(
    @Param('projectId') projectId: string,
    @CurrentUser() user: Auth.CognitoUser,
  ): Promise<TaskResponseDTO[]> {
    console.log(user);
    return this.tasksService.findMany(projectId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, type: TaskResponseDTO })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDTO,
    @CurrentUser() user: Auth.CognitoUser,
  ): Promise<TaskResponseDTO> {
    console.log(user);
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 204 })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: Auth.CognitoUser,
  ): Promise<void> {
    console.log(user);
    await this.tasksService.delete(id);
  }
}
