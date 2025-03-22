import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Project } from '#domain/types/project';

@Controller('projects')
export class ProjectsController {
  @Post()
  async create(@Body() data: Project.CreateDTO): Promise<string> {
    console.log(data);
    return `create project`;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<string> {
    return `find project by id ${id}`;
  }

  @Get()
  async findMany(): Promise<string> {
    return `find many projects`;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Project.UpdateDTO,
  ): Promise<string> {
    console.log(data);
    return `update project ${id}`;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<string> {
    return `delete project ${id}`;
  }
}
