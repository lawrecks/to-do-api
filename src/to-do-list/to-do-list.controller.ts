import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoDtoList } from './dto/update-to-do-list.dto';
import { plainToClass } from 'class-transformer';
import { ToDoList } from 'src/shared/database/entities/to-do-list.entity';
import { stripKeys, successResponse } from 'src/shared/helpers';
import { PaginationOptions } from 'src/shared/interface/pagination.interface';

@Controller('to-do-list')
export class ToDoListController {
  constructor(private readonly service: ToDoListService) {}

  @Post()
  async create(@Body() dto: CreateToDoListDto) {
    const data: ToDoList = plainToClass(ToDoList, {
      name: dto.name,
      user: dto.user_id,
    });
    const toDoList = await this.service.create(data);

    return successResponse(
      201,
      'To-do list created successfully',
      stripKeys(toDoList, ['deleted_at']),
    );
  }

  @Get()
  async findAll(@Query() query: PaginationOptions) {
    const data = await this.service.findAll(query);

    return successResponse(
      200,
      'To-do lists fetched successfully',
      stripKeys(data, ['deleted_at']),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const toDoList = await this.service.findOne(+id);

    return successResponse(
      200,
      'To-do list fetched successfully',
      stripKeys(toDoList, ['deleted_at']),
    );
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateToDoDtoList) {
    const updatedData = await this.service.update(+id, dto);

    return successResponse(
      200,
      'To-do list updated successfully',
      stripKeys(updatedData, ['deleted_at']),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.service.remove(+id);
    return successResponse(201, 'To-do list deleted successfully');
  }
}
