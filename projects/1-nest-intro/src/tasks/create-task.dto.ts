import { TaskStatus } from './task.model';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString({ message: 'should be string' })
  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
