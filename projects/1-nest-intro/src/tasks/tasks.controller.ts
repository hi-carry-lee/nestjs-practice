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
import { ITask } from './task.model';
import { CreateTaskDTO } from './create-task.dto';
import { FindOneParams } from './find-one.param';
import { UpdateTaskStatusDto } from './update-status.dto';
import { UpdateTaskDTO } from './update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(): ITask[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): ITask {
    return this.tasksService.findOne(params.id);
  }

  @Post()
  createTask(@Body() taskDto: CreateTaskDTO): ITask {
    return this.tasksService.createTask(taskDto);
  }

  @Patch(':id/status')
  updateTaskStatus(
    // in update and patch, id used to be put in the url
    @Param() params: FindOneParams,
    @Body() body: UpdateTaskStatusDto,
  ): ITask {
    return this.tasksService.updateTaskStatus(params.id, body.status);
  }

  @Put(':id')
  updateTask(
    // in update and patch, id used to be put in the url
    @Param() params: FindOneParams,
    @Body() body: UpdateTaskDTO,
  ): ITask {
    return this.tasksService.updateTask(params.id, body);
  }

  @Delete(':id')
  // when use this decorator, even it return something in the code, it will be discarded
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param() params: FindOneParams): void {
    this.tasksService.deleteOne(params.id);
  }
}
