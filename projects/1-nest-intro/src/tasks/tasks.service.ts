import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { randomUUID } from 'crypto';
import { CreateTaskDTO } from './create-task.dto';
import { UpdateTaskDTO } from './update-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [
    {
      id: '19fabe0c-5420-44a1-99e4-40e01f7fee72',
      title: 'taskA',
      desc: 'task A',
      status: TaskStatus.OPEN,
    },
    {
      id: randomUUID(),
      title: 'taskB',
      desc: 'task B',
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  findAll(): ITask[] {
    return this.tasks;
  }

  findOne(id: string): ITask {
    const task = this.findOneOrFail(id);
    return task;
  }

  createTask(task: CreateTaskDTO): ITask {
    const newTask: ITask = { ...task, id: randomUUID() };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTaskStatus(id: string, status: TaskStatus): ITask {
    const task = this.findOneOrFail(id);
    task.status = status;
    return task;
  }

  updateTask(id: string, updatedTask: UpdateTaskDTO): ITask {
    console.log({ updatedTask });
    const task = this.findOneOrFail(id);

    if (
      updatedTask.status &&
      !this.isValidStatusTransition(task.status, updatedTask.status)
    ) {
      throw new BadRequestException('Invalid status!');
    }

    // we handle null and undefined value in DTO, so the following code is redundant;
    const filteredTask: UpdateTaskDTO = Object.fromEntries(
      Object.entries(updatedTask).filter(
        ([, v]) => v != null && v != undefined,
      ),
    );
    console.log({ filteredTask });
    // 直接使用展开运算符，更简洁
    const newTask = { ...task, ...filteredTask };

    this.tasks = this.tasks.map((t) => (t.id === id ? newTask : t));
    return newTask;
  }

  private isValidStatusTransition(
    currentStatus: TaskStatus,
    newStatus: TaskStatus,
  ): boolean {
    const statusOrder = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE,
    ];

    return (
      // no allow use the front status
      statusOrder.indexOf(currentStatus) < statusOrder.indexOf(newStatus) &&
      // no allow to jump to the one after next status
      statusOrder.indexOf(newStatus) === statusOrder.indexOf(currentStatus) + 1
    );
  }

  private findOneOrFail(id: string): ITask {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      // exception is also business logic, it's recommended to throw it here, instead of return undefine;
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  deleteOne(id: string): void {
    this.findOneOrFail(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
