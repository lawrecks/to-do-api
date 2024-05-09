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
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'src/shared/database/entities/task.entity';
import { plainToClass } from 'class-transformer';
import { stripKeys, successResponse } from 'src/shared/helpers';
import { PaginationOptions } from 'src/shared/interface/pagination.interface';
import { UserAuthGuard } from 'src/user/auth/user.guard';

@UseGuards(UserAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    const data: Task = plainToClass(Task, {
      ...dto,
      toDoList: dto.toDoListId,
    });
    const task = await this.service.create(data);

    return successResponse(
      201,
      'Task created successfully',
      stripKeys(task, ['deleted_at']),
    );
  }

  @Get()
  async findAll(
    @Param('toDoListId') toDoListId: number,
    @Query() query: PaginationOptions,
  ) {
    const [data, count] = await this.service.findAll(toDoListId, query);

    return successResponse(200, 'Tasks fetched successfully', {
      tasks: stripKeys(data, ['deleted_at']),
      count,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const task = await this.service.getOne(+id);

    return successResponse(
      200,
      'Task fetched successfully',
      stripKeys(task, ['deleted_at']),
    );
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    await this.service.getOne(id);
    const updatedData = await this.service.update(+id, dto);

    return successResponse(
      200,
      'Task updated successfully',
      stripKeys(updatedData, ['deleted_at']),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.service.getOne(id);
    return this.service.remove(+id);
  }
}
