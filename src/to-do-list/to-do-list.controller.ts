import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoDtoList } from './dto/update-to-do-list.dto';
import { plainToClass } from 'class-transformer';
import { ToDoList } from '../shared/database/entities/to-do-list.entity';
import { stripKeys, successResponse } from '../shared/helpers';
import { PaginationOptions } from '../shared/pagination-options';
import { Request } from 'express';
import { User } from '../shared/database/entities/user.entity';
import { UserAuthGuard } from '../user/auth/user.guard';

@UseGuards(UserAuthGuard)
@Controller('to-do-list')
export class ToDoListController {
  constructor(private readonly service: ToDoListService) {}

  @Post()
  async create(@Req() req: Request, @Body() dto: CreateToDoListDto) {
    const user = req.user as User;
    const data: ToDoList = plainToClass(ToDoList, {
      name: dto.name,
      user,
    });
    const toDoList = await this.service.create(data);

    return successResponse(
      HttpStatus.CREATED,
      'To-do list created successfully',
      stripKeys(toDoList, ['deletedAt']),
    );
  }

  @Get()
  async findAll(@Query() query: PaginationOptions) {
    const { page = 1, limit = 10 } = query;
    const [data, total] = await this.service.findAll({ ...query, page, limit });

    return successResponse(HttpStatus.OK, 'To-do lists fetched successfully', {
      toDoLists: stripKeys(data, ['deletedAt']),
      total,
      page: +page,
      limit: +limit,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const toDoList = await this.service.getOne(id);

    return successResponse(
      HttpStatus.OK,
      'To-do list fetched successfully',
      stripKeys(toDoList, ['deletedAt']),
    );
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateToDoDtoList) {
    await this.service.getOne(id);
    await this.service.update(+id, dto);
    const updatedData = await this.service.findOne(id);
    return successResponse(
      HttpStatus.OK,
      'To-do list updated successfully',
      stripKeys(updatedData, ['deletedAt']),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.service.getOne(id);
    await this.service.remove(id);
    return successResponse(HttpStatus.OK, 'To-do list deleted successfully');
  }
}
