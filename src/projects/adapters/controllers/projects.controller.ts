import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProjectsService } from '../../application/services/projects.service';
import { CreateProjectDTO, ProjectResponseDTO, UpdateProjectDTO } from './dtos';
import { Project } from '#domain/types';
import { AuthGuard } from '@auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Auth } from '#domain/types/auth';

@ApiTags('projects')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully',
    type: ProjectResponseDTO,
  })
  async create(
    @Body() data: CreateProjectDTO,
    @CurrentUser() user: Auth.CognitoUser,
  ): Promise<ProjectResponseDTO> {
    return this.projectsService.create(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  @ApiResponse({
    status: 200,
    description: 'Project found',
    type: ProjectResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  async findById(
    @Param('id') id: Project.Entity['id'],
    @CurrentUser() user: Auth.CognitoUser,
  ): Promise<ProjectResponseDTO | null> {
    return this.projectsService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'List of projects',
    type: [ProjectResponseDTO],
  })
  async findMany(
    @CurrentUser() user: Auth.CognitoUser,
  ): Promise<ProjectResponseDTO[]> {
    return this.projectsService.findMany();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
    type: ProjectResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  async update(
    @Param('id') id: Project.Entity['id'],
    @Body() data: UpdateProjectDTO,
    @CurrentUser() user: Auth.CognitoUser,
  ): Promise<ProjectResponseDTO> {
    return this.projectsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({
    status: 200,
    description: 'Project deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  async delete(
    @Param('id') id: Project.Entity['id'],
    @CurrentUser() user: Auth.CognitoUser,
  ): Promise<void> {
    return this.projectsService.delete(id);
  }
}
