import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../shared/database/entities/task.entity';
import { plainToClass } from 'class-transformer';
import { stripKeys, successResponse } from '../shared/helpers';
import { UserAuthGuard } from '../user/auth/user.guard';
import { ToDoListService } from '../to-do-list/to-do-list.service';
import { TaskQueryDto } from './dto/task-query.dto';

@UseGuards(UserAuthGuard)
@Controller('task')
export class TaskController {
  constructor(
    private readonly service: TaskService,
    private readonly toDoListService: ToDoListService,
  ) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    await this.toDoListService.getOne(dto.toDoListId);
    const data: Task = plainToClass(Task, {
      ...dto,
      toDoList: dto.toDoListId,
    });
    const task = await this.service.create(data);

    return successResponse(
      HttpStatus.CREATED,
      'Task created successfully',
      stripKeys(task, ['deletedAt']),
    );
  }

  @Get()
  async findAll(@Query() query: TaskQueryDto) {
    const { toDoListId, page = 1, limit = 10 } = query;
    await this.toDoListService.getOne(toDoListId);
    const [data, total] = await this.service.findAll({ ...query, page, limit });

    return successResponse(HttpStatus.OK, 'Tasks fetched successfully', {
      tasks: stripKeys(data, ['deletedAt']),
      total,
      page: +page,
      limit: +limit,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const task = await this.service.getOne(+id);

    return successResponse(
      HttpStatus.OK,
      'Task fetched successfully',
      stripKeys(task, ['deletedAt']),
    );
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    await this.service.getOne(id);
    await this.service.update(+id, dto);
    const updatedData = await this.service.findOne(id);

    return successResponse(
      HttpStatus.OK,
      'Task updated successfully',
      stripKeys(updatedData, ['deletedAt']),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.service.getOne(id);
    await this.service.remove(id);
    return successResponse(HttpStatus.OK, 'Task deleted successfully');
  }
}
