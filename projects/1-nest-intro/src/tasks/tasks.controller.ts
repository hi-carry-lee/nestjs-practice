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
import { CreateTaskDTO } from './dto/create-task.dto';
import { FindOneParams } from './dto/find-one.param';
import { UpdateTaskStatusDto } from './dto/update-status.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task } from './entity/task.entity';

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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

/*
在POST接口中添加：// eslint-disable-next-line @typescript-eslint/no-unsafe-argument的说明：
1. this.tasksService.createTask(taskDto)中的参数taskDto 出现告警：Unsafe argument of type error typed assigned to a parameter of type `CreateTaskDTO`.eslint@typescript-eslint/no-unsafe-argument

2. 因为在 DTO 里加了嵌套类型（labels?: CreateTaskLabelDto[]，并用了 @ValidateNested 和 @Type()）后，@Body 得到的对象结构会更复杂，TypeScript 的类型静态推断难度上升，就容易触发 no-unsafe-argument 这类告警。

3. 对于嵌套 DTO，Nest 的 @Body() 解析的原始对象类型会被断定为 any 或 {}，
而运行时才会用 class-transformer 和 class-validator 去递归转/校验成你的目标类实例结构。

4, 但TypeScript 编译阶段拿不到运行时“递归转换”这些信息，
它只是简单推断 @Body() 拿到的类型是普通 object（而不是 CreateTaskDTO 真正的实例），

5. 一旦你传递这种“静态告诉你是 object，但代码期望严格 CreateTaskDTO”的数据，ESLint/TypeScript 就报 no-unsafe-argument。
对于嵌套情况，ts 推断更容易“宽泛化”为 any[]、object[] 之类类型，所以警告概率上升。

解决方案：
1. 使用注释，把警告加上 ignore，等待社区后续改善
2. 用 DTO 类型断言
  this.tasksService.createTask(taskDto as CreateTaskDTO);
3. 暂时调宽 lint 规则：在 .eslintrc.js 或 tsconfig.json 里将相关规则降级/关闭
4. 或者忽略这个警告

*/
