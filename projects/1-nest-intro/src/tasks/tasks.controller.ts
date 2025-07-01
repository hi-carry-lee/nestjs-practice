import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './create-task.dto';
import { FindOneParams } from './find-one.param';
import { UpdateTaskStatusDto } from './update-status.dto';
import { UpdateTaskDTO } from './update-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams): Promise<Task> {
    const task = await this.tasksService.findOne(params.id);
    return task;
  }

  @Post()
  async createTask(@Body() taskDto: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(taskDto);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    // in update and patch, id used to be put in the url
    @Param() params: FindOneParams,
    @Body() body: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(params.id, body.status);
  }

  @Put(':id')
  async updateTask(
    // in update and patch, id used to be put in the url
    @Param() params: FindOneParams,
    @Body() body: UpdateTaskDTO,
  ): Promise<Task> {
    return this.tasksService.updateTask(params.id, body);
  }

  @Delete(':id')
  // when use this decorator, even it return something in the code, it will be discarded
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param() params: FindOneParams): Promise<void> {
    await this.tasksService.deleteOne(params.id);
  }
}
