import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  public findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  public findOne(id: string): Promise<Task> {
    return this.findOneOrFail(id);
  }

  public async createTask(task: CreateTaskDTO): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.findOneOrFail(id);
    task.status = status;
    return this.taskRepository.save(task);
  }

  public async updateTask(
    id: string,
    updatedTask: UpdateTaskDTO,
  ): Promise<Task> {
    const task = await this.findOneOrFail(id);

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
    // 直接使用展开运算符，更简洁
    const newTask = { ...task, ...filteredTask };

    return this.taskRepository.save(newTask);
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

  private async findOneOrFail(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      // exception is also business logic, it's recommended to throw it here, instead of return undefine;
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  public async deleteOne(id: string): Promise<void> {
    await this.findOneOrFail(id);
    await this.taskRepository.delete({ id });
  }
}
