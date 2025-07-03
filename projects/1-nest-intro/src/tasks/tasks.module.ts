import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskLabel } from './task-label.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskLabel]), // 只需要在这里注册
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
